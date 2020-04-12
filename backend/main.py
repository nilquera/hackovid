from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
import json
import os

app = FastAPI()

password = "<MongoDB password>"

client = MongoClient(
    'mongodb+srv://ignasi:' + password + '@cluster0-usg2t.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')


class User(BaseModel):
    email: str  # Used as ID
    name: str
    password: str
    phone_number: int
    role: str


class Buyer:
    id: str  # References user["email"]
    salary: float
    purchases: list


class Seller(BaseModel):
    id: str  # References user["email"]
    advertisement: list  # NO CAL


class Advertisement(BaseModel):
    seller: str  # Used as ID
    title: str
    description: str
    city: str
    street: str
    number: int
    lat: float
    long: float
    packs: list  # NO CAL


class Pack(BaseModel):
    id: str  # This ID is our own -> advertisement+pack["title"]. This way we make sure no repeated packs are attempted.
    title: str
    description: str
    advertisement: str  # References advertisement["seller"]
    price: float


class Transaction(BaseModel):
    id: str  # This ID is our own -> random str
    seller: str
    buyer: str
    advertisement: str
    pack: str


@app.get("/")
def welcome():
    return {"WELCOME TO A HACK COVID PROJECT": "Done by @nilquera + @ignasioliver"}


@app.get("/users")
def get_users():
    # By default, if find() is left empty its filter = {}
    all_users_fetched = client['hackovid']['user'].find()
    all_users_list = []
    for user in all_users_fetched:
        new_user = {
            "name": user["name"],
            "email": user["email"],
            "phone_number": user["phone_number"],
            "role": user["role"]}
        all_users_list.append(new_user)
    return all_users_list


@app.get("/user/{email}")
def get_user_email(email: str):
    filter_email = {"email": email}
    user_fetched = client['hackovid']['user'].find_one(filter_email)
    if not user_fetched:
        return {
            "result": "error",
            "description": "No user with email '" + str(email) + "' found."
        }
    return json.dumps(str(user_fetched))


@app.post("/user/{name}/{email}/{phone_number}/{role}")
def post_user(name: str, email: str, phone_number: int, role: str):
    print("ROLE:")
    print(role)
    if role == "buyer":
        buyer_to_insert = {
            "id":  email,
            "salary": 1000.0,
            "purchases": "[]"
        }
        client['hackovid']['buyer'].insert_one(buyer_to_insert)
    elif role == "seller":
        seller_to_insert = {
            "id": email,
            "advertisement": "[]"
        }
        client['hackovid']['seller'].insert_one(seller_to_insert)
    else:
        return {
            "result": "error",
            "description": "User can only have role 'seller' or 'buyer'"
        }
    user_to_insert = {
        "name": name,
        "email": email,
        "phone_number": phone_number,
        "role": role
    }
    try:
        client['hackovid']['user'].insert_one(user_to_insert)
        return {
            "result": "success",
            "description": "User properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.get("/advertisements_old")
def get_advertisements():
    # By default, if find() is left empty its filter = {}
    all_advertisements_fetched = client['hackovid']['advertisement'].find()
    all_advertisements_list = []
    for ad in all_advertisements_fetched:
        new_ad = {
            "seller": ad["seller"],
            "title": ad["title"],
            "description": ad["description"],
            "location": ad["location"],
            "packs": ad["packs"]
        }
        all_advertisements_list.append(new_ad)
    return all_advertisements_list


@app.get("/advertisement/{seller}")
def get_advertisement_seller(seller: str):
    filter_email = {"seller": seller}
    advertisement_fetched = client['hackovid']['advertisement'].find_one(filter_email)
    if not advertisement_fetched:
        return {
            "result": "error",
            "description": "No advertisement with seller '" + str(seller) + "' found."
        }
    return json.dumps(str(advertisement_fetched))


@app.post("/advertisement/{seller}/{title}/{description}/{location}")
def post_advertisement(seller: str,
                       title: str,
                       description: str,
                       city: str,
                       street: str,
                       number: int,
                       lat: float,
                       long: float,
                       packs: str = "[]"):

    advertisement_to_insert = {
        "seller": seller,
        "title": title,
        "description": description,
        "city": city,
        "street": street,
        "number": number,
        "lat": lat,
        "long": long,
        "packs": packs
    }
    try:
        client['hackovid']['advertisement'].insert_one(advertisement_to_insert)
        return {
            "result": "success",
            "description": "Advertisement properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.put("/advertisement/{seller}")
def put_advertisement_seller(seller: str, packs: str):
    filter_email = {"seller": seller}
    advertisement_fetched = client['hackovid']['advertisement'].find_one(filter_email)
    advertisement_fetched["packs"] = packs
    _filter = {"seller": seller}
    _update = {"$set": {"packs": packs}}
    res = client['hackovid']['advertisement'].update_one(_filter, _update)
    print(str(res))
    if not advertisement_fetched:
        return {
            "result": "error",
            "description": "No advertisement with seller '" + str(seller) + "' found."
        }
    return json.dumps(str(client['hackovid']['advertisement'].find_one(filter_email)))


@app.get("/packs")
def get_packs():
    # By default, if find() is left empty its filter = {}
    all_packs_fetched = client['hackovid']['pack'].find()
    all_packs_list = []
    for p in all_packs_fetched:
        new_pack = {
            "id": p["id"],
            "title": p["title"],
            "description": p["phone_number"],
            "advertisement": p["advertisement"],
            "price": p["price"]
        }
        all_packs_list.append(new_pack)
    return all_packs_list


@app.get("/packs/{seller}")
def get_packs_seller(seller: str):
    filter_email = {"advertisement": seller}
    all_packs_fetched = client['hackovid']['pack'].find(filter_email)
    all_packs_list = []
    for p in all_packs_fetched:
        new_pack = {
            "id": p["id"],
            "title": p["title"],
            "description": p["description"],
            "advertisement": p["advertisement"],
            "price": p["price"]
        }
        all_packs_list.append(new_pack)
    return all_packs_list


@app.post("/pack/{title}/{description}/{advertisement}/{price}")
def post_pack(title: str, description: str, advertisement: str, price: float):
    pack_to_insert = {
        "id": advertisement + title,
        "title": title,
        "description": description,
        "advertisement": advertisement,
        "price": price
    }
    try:
        client['hackovid']['pack'].insert_one(pack_to_insert)
        return {
            "result": "success",
            "description": "Advertisement properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.get("/advertisements_with_packs")
def get_advertisements_with_packs():
    # By default, if find() is left empty its filter = {}
    all_advertisements_fetched = client['hackovid']['advertisement'].find()
    all_advertisements_list = []
    for ad in all_advertisements_fetched:
        new_ad = {
            "seller": ad["seller"],
            "title": ad["title"],
            "description": ad["description"],
            "location": ad["location"],
            "packs": ad["packs"]
        }
        all_advertisements_list.append(new_ad)
    return all_advertisements_list


# NEW Routes:
@app.post("/user/")
def new_post_user(name: str, email: str, role: str, phone_number: int = 0):
    if role == "buyer":
        buyer_to_insert = {
            "id":  email,
            "salary": 1000.0,
            "purchases": "[]"
        }
        client['hackovid']['buyer'].insert_one(buyer_to_insert)
    elif role == "seller":
        seller_to_insert = {
            "id": email,
            "advertisement": "[]"
        }
        client['hackovid']['seller'].insert_one(seller_to_insert)
    else:
        return {
            "result": "error",
            "description": "User can only have role 'seller' or 'buyer'"
        }
    user_to_insert = {
        "name": name,
        "email": email,
        "phone_number": phone_number,
        "role": role
    }
    try:
        client['hackovid']['user'].insert_one(user_to_insert)
        return {
            "result": "success",
            "description": "User properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.post("/advertisement")
def new_post_advertisement(seller: str,
                       title: str,
                       description: str,
                       city: str,
                       street: str,
                       number: int,
                       lat: float,
                       long: float):

    advertisement_to_insert = {
        "seller": seller,
        "title": title,
        "description": description,
        "city": city,
        "street": street,
        "number": number,
        "lat": lat,
        "long": long,
        "packs": "[]"
    }
    try:
        client['hackovid']['advertisement'].insert_one(advertisement_to_insert)
        return {
            "result": "success",
            "description": "Advertisement properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.post("/pack")
def new_post_pack(title: str, description: str, advertisement: str, price: float):
    pack_to_insert = {
        "id": advertisement + title,
        "title": title,
        "description": description,
        "advertisement": advertisement,
        "price": price
    }
    try:
        client['hackovid']['pack'].insert_one(pack_to_insert)
        return {
            "result": "success",
            "description": "Advertisement properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.get("/advertisements")
def new_get_all_advertisements():
    # By default, if find() is left empty its filter = {}
    all_advertisements_fetched = client['hackovid']['advertisement'].find()
    all_advertisements_list = []
    for ad in all_advertisements_fetched:

        new_ad = {
            "seller": ad["seller"],
            "title": ad["title"],
            "description": ad["description"],
            "city": ad["city"],
            "street": ad["street"],
            "number": ad["number"],
            "lat": ad["lat"],
            "long": ad["long"],
            "packs": get_packs_seller(ad["seller"])
        }
        all_advertisements_list.append(new_ad)
    return all_advertisements_list


@app.post("/transaction")
def new_post_transaction(seller: str, buyer: str, advertisement: str, pack: str):
    pack_to_insert = {
        "id": "example",
        "seller": seller,
        "buyer": buyer,
        "advertisement": advertisement,
        "pack": pack
    }
    try:
        client['hackovid']['transaction'].insert_one(pack_to_insert)
        return {
            "result": "success",
            "description": "Transaction properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }

