import requests, time, os, random
from datetime import datetime
import csv
from pathlib import Path

# Check if file exists and create header only if it's a new file
csv_file = "results.csv"
if not Path(csv_file).exists():
    with open(csv_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "cpu_usage", "memory_usage", "http_reqs", "predicted_cpu", "predicted_containers"])

while True:
    data = {
        "http_req_duration": random.randint(100, 400),
        "response_time": random.randint(300, 700),
        "vus": random.randint(5, 20),
        "success_rate": 95 + random.random() * 5,
        "http_reqs": random.randint(500, 800),
        "cpu_usage": random.randint(60, 90),
        "memory_usage": random.randint(50, 80)
    }

    try:
        response = requests.post("http://localhost:5000/predict", json=data)
        pred = response.json()
        cpu, containers = int(pred["cpu"]), int(pred["containers"])
        print(f"Predicted -> CPU: {cpu}, Containers: {containers}")

        os.system(f"docker-compose up --scale product-service={containers} -d")

        with open(csv_file, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([datetime.now(), data["cpu_usage"], data["memory_usage"], data["http_reqs"], cpu, containers])

    except Exception as e:
        print(f"Error: {e}")

    time.sleep(60)
