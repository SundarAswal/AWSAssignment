from flask import Flask, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://thesundarsingh:SundarMongo1234@cluster0.sh84jvm.mongodb.net/?appName=Cluster0")

db = client["todo_db"]
@app.route("/")
def home():
    return "✅ Backend is running"
@app.route("/todos", methods=["GET"])
def get_todos():
    todos = list(db.todos.find({}, {"_id": 0}))
    return {"todos": todos}
    
@app.route('/submittodoitem', methods=['POST'])
def submit_todo():
    data = request.form

    db.todos.insert_one({
        "itemName": data.get("itemName"),
        "itemDescription": data.get("itemDescription")
    })

    return "✅ Saved"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)