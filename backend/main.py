import jwt
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from pydantic import BaseModel

origins = [
    "*"
]

SECRET_KEY = "<your own secret key>"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password = "<MongoDB password>"
client = MongoClient(
    'mongodb+srv://ignasi:' + password + '@cluster0-usg2t.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None


class User(BaseModel):
    email: str  # Used as ID
    name: str
    password: str
    phone_number: int
    role: str


class Buyer:
    id: str  # References user["email"]
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
    id: str  # This ID is our own -> advertisement+pack["title"]. We should make sure no repeated packs are attempted.
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


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(email: str, password: str):
    filter_email = {"email": email}
    user_fetched = client['hackovid']['user'].find_one(filter_email)

    if not user_fetched:
        return False

    if not verify_password(password, user_fetched["password"]):
        return False

    return user_fetched


def authenticate_user(email: str, password: str):
    user = get_user(email, password)
    if not user:
        return False
    if not verify_password(password, user["password"]):  # "password" is expected to be a hashed password
        return False
    return user


def create_access_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def validate_user(email, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if email is not payload.get("sub"):
            raise credentials_exception
        token_data = TokenData(email=email)
    except Exception:  # should only handle PyJWTError
        raise credentials_exception

    return True


def get_info_pack(id_pack: str):
    filter_pack = {"id": id_pack}
    pack_fetched = client['hackovid']['pack'].find_one(filter_pack)
    if not pack_fetched:
        raise HTTPException(status_code=400, detail="Pack not found")
    return {
        "title": pack_fetched["title"],
        "description": pack_fetched["description"]
    }


def get_listed_transaction(all_transactions_fetched):
    all_transactions_list = []
    for t in all_transactions_fetched:
        new_ad = {
            "buyer": t["buyer"],
            "advertisement": t["advertisement"],
            "pack": get_info_pack(t['pack'])
        }
        all_transactions_list.append(new_ad)
    return all_transactions_list


@app.post("/login")
def login(email: str, password: str):
    user_fetched = authenticate_user(email, password)

    if not authenticate_user(email, password):
        raise HTTPException(status_code=400, detail="Email or password incorrect")

    access_token_expires = timedelta(minutes=300000)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )

    return {
        "result": "success",
        "description": "Login successful",
        "user": {
            "name": user_fetched['name'],
            "email": user_fetched['email'],
            "role": user_fetched['role']
        },
        "token": access_token
    }


@app.post("/user")
def post_user(name: str, email: str, role: str, password: str, phone_number: int = 0):
    if email in str(get_user(email, password)):
        raise HTTPException(status_code=400, detail="User " + email + " already registered")
    if role == "buyer":
        buyer_to_insert = {
            "id":  email,
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
    hashed_password = get_password_hash(password)
    user_to_insert = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "phone_number": phone_number,
        "role": role
    }
    try:
        client['hackovid']['user'].insert_one(user_to_insert)

        access_token_expires = timedelta(minutes=300000)
        access_token = create_access_token(
            data={"sub": user_to_insert["email"]}, expires_delta=access_token_expires
        )

        return {
            "result": "success",
            "description": "User properly added.",
            "user": {
                "name": name,
                "email": email,
                "role": role
            },
            "token": access_token,
        }

    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.get("/advertisements")
def get_all_advertisements():
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


@app.post("/advertisement")
def post_advertisement(seller: str,
                           title: str,
                           description: str,
                           city: str,
                           street: str,
                           number: int,
                           lat: float,
                           long: float,
                           access_token: str):

    if not validate_user(seller, access_token):
        raise HTTPException(status_code=400, detail="User could not be identified")

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


@app.post("/pack")
def post_pack(title: str, description: str, advertisement: str, price: float, access_token: str):
    if not validate_user(advertisement, access_token):
        raise HTTPException(status_code=400, detail="User could not be identified")

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
            "description": "Pack properly added."
        }
    except Exception as e:
        return {
            "result": "error",
            "description": str(e)
        }


@app.get("/transaction")
def get_all_transactions():
    all_transactions_fetched = client['hackovid']['transaction'].find()
    return get_listed_transaction(all_transactions_fetched)


@app.post("/transaction")
def post_transaction(buyer: str, advertisement: str, pack: str, access_token: str):
    if not validate_user(buyer, access_token):
        raise HTTPException(status_code=400, detail="User could not be identified")

    pack_to_insert = {
        "buyer": buyer,
        "advertisement": advertisement,  # email of the seller
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


@app.get("/transaction/seller")
def get_transactions_seller(seller: str, access_token: str):
    if not validate_user(seller, access_token):
        raise HTTPException(status_code=400, detail="User could not be identified")

    filter_seller = {"advertisement": seller}
    all_transactions_fetched = client['hackovid']['transaction'].find(filter_seller)
    return get_listed_transaction(all_transactions_fetched)


@app.get("/transaction/buyer")
def get_transactions_buyer(buyer: str, access_token: str):
    if not validate_user(buyer, access_token):
        raise HTTPException(status_code=400, detail="User could not be identified")

    filter_buyer = {"buyer": buyer}
    all_transactions_fetched = client['hackovid']['transaction'].find(filter_buyer)
    return get_listed_transaction(all_transactions_fetched)


@app.get("/")
def welcome():
    return {"Welcome to Comencia": "Comencia is a project built during Hackovid.cat",
            "Project": {
                "Live webapp": "https://comencia-355ef.web.app/",
                "GitHub repository": "https://github.com/nilquera/hackovid",
                "YouTube presentation": "https://www.youtube.com/watch?v=3sNrU33rOpQ&feature=youtu.be"
            },
            "Authors": {
                "frontend": {
                    "Name": "Nil Quera",
                    "GitHub username": "@nilquera"
                },
                "backend": {
                    "Name": "Ignasi Oliver",
                    "GitHub username": "@ignasioliver"
                }
            }}






