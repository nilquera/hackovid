# HACKOVID

## Backend
## TODO
- (DOING RN) Check all routes
- Confirm flow of Advertisements -> Packs
- Implement password - encryption system
- Check verifications of existent records on all models
### Setup
Make sure you are on backend/
~~~~
virtualenv venv
source venv/bin/activate
python3.7 -m pip install -r requirements.txt
~~~~

### Run it
Make sure you are on backend/ and your IP is whitelisted if the MongoDB is not public
~~~~
uvicorn main:app --reload
~~~~
Then, on a web browser load:
http://127.0.0.1:8000/docs

### Issues
~~~~
(SOLVED with pymongo[srv]) pymongo.errors.ServerSelectionTimeoutError: cluster0-usg2t.mongodb.net:27017: [Errno -2] Name or service not known
~~~~
