# Backend

#### A continuació s'especifica com utilitzar el backend de **Comencia**.

The following are instructions to set up the **Comencia** backend in other systems.

### Setup
Make sure you are on backend/
~~~~
virtualenv venv
source venv/bin/activate
python3.7 -m pip install -r requirements.txt
~~~~

For security reasons, external users do not have admin access to the MongoDB collections. However you can set up your own cluster replacing the following variables on ```main.py```
~~~~
password
client 
~~~~
To learn more about it you can look into the [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/).

You will also have to define a secret key on your own. This way you can control accessibility on the registration/login/other endpoints. Do it through the variable:
~~~~
SECRET_KEY
~~~~

### Run it
Make sure you are on backend/ and your IP is whitelisted -if the MongoDB cluster is not public:
~~~~
uvicorn main:app --reload
~~~~
Then, on a web browser load:
http://127.0.0.1:8000/docs
