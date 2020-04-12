from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
import json
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.post("/user")
def new_post_user(name: str, email: str, role: str, phone_number: int = 0):
    if email in str(get_user_email(email)):
        raise HTTPException(status_code=400, detail="User " + email + " already registered")
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
            "description": "User properly added.",
            "user": {
                "name": name,
                "role": role
            }
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.post("/login") # Mock login: retorna 200 si l'email existeix a la bd
def login(email: str, password: str):
    print (email)
    print (password)
    filter_email = {"email": email}
    user_fetched = client['hackovid']['user'].find_one(filter_email)
    if not user_fetched:
        raise HTTPException(status_code=400, detail="Email or password incorrect")
        # return {
        #     "result": "error",
        #     "description": "No user with email '" + str(email) + "' found."
        # }
    # print(user_fetched["name"])
    # userJSON = json.dumps(str(user_fetched))
    return {
        "result": "success",
        "description": "Login successful",
        "user": {
            "name": user_fetched['name'],
            "role": user_fetched['role']
        },
        "token": "mocktoken"
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
def new_post_transaction(buyer: str, advertisement: str, pack: str):
    pack_to_insert = {
        "buyer": buyer,
        "advertisement": advertisement, #  email of the seller
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
