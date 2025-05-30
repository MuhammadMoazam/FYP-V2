from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
cpu_model = joblib.load("cpu_model.pkl")
container_model = joblib.load("container_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = [[
        data["http_req_duration"],
        data["response_time"],
        data["vus"],
        data["success_rate"],
        data["http_reqs"],
        data["cpu_usage"],
        data["memory_usage"]
    ]]
    cpu = cpu_model.predict(features)[0]
    containers = container_model.predict(features)[0]
    return jsonify({"cpu": cpu, "containers": containers})
