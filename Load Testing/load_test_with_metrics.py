import requests
import psutil
import time
import csv
from tqdm import tqdm

# Define the pages to test
pages = [
    {"name": "Home", "url": "http://localhost:3000/"},
    {"name": "About", "url": "http://localhost:3000/about"},
    {"name": "Contact", "url": "http://localhost:3000/contact"},
    {"name": "Login", "url": "http://localhost:3000/login"},
    {"name": "Cart", "url": "http://localhost:3000/cart"},
    {"name": "Shop", "url": "http://localhost:3000/shop"},
    {"name": "Wishlist", "url": "http://localhost:3000/wishlist"},
    {"name": "Blog", "url": "http://localhost:3000/blog"},
]

# Function to monitor CPU and memory usage
def monitor_resources():
    cpu_usage = psutil.cpu_percent(interval=0.1)  # CPU usage percentage
    memory_info = psutil.virtual_memory()  # Memory usage details
    memory_usage = memory_info.percent  # Memory usage percentage
    return cpu_usage, memory_usage

# Function to perform load testing and collect metrics
def perform_load_test():
    metrics = []
    start_time_total = time.time()
    requests_completed = 0
    total_iterations = 333
    total_requests = total_iterations * len(pages)
    
    # Main progress bar for overall progress
    with tqdm(total=total_requests, desc="Overall Progress", unit="req") as pbar:
        for _ in range(total_iterations):
            for page in pages:
                request_start = time.time()
                start_time = time.time()
                
                try:
                    # Send a small HEAD request first to measure latency
                    latency_check = requests.head(page["url"])
                    latency = (time.time() - request_start) * 1000  # Convert to milliseconds
                    
                    # Now send the actual GET request
                    response = requests.get(page["url"])
                    end_time = time.time()
                    
                    requests_completed += 1
                    elapsed_total = end_time - start_time_total
                    throughput = requests_completed / elapsed_total if elapsed_total > 0 else 0
                    
                    response_time = (end_time - start_time) * 1000  # Convert to milliseconds
                    cpu_usage, memory_usage = monitor_resources()

                    metrics.append({
                        "http_req_duration": response.elapsed.total_seconds() * 1000,
                        "response_time": response_time,
                        "vus": 1,
                        "success_rate": 100 if response.status_code == 200 else 0,
                        "http_reqs": 1,
                        "cpu_usage": cpu_usage,
                        "memory_usage": memory_usage,
                        "latency": latency,  # New column
                        "throughput": throughput  # New column
                    })
                    
                except requests.RequestException:
                    # Handle failed requests
                    metrics.append({
                        "http_req_duration": 0,
                        "response_time": 0,
                        "vus": 1,
                        "success_rate": 0,
                        "http_reqs": 1,
                        "cpu_usage": cpu_usage,
                        "memory_usage": memory_usage,
                        "latency": 0,
                        "throughput": 0
                    })
                
                # Update the progress bar
                pbar.update(1)
                pbar.set_postfix({
                    'Page': page['name'],
                    'CPU': f"{cpu_usage:.1f}%",
                    'Memory': f"{memory_usage:.1f}%"
                })

    return metrics

# Save the metrics to a CSV file
def save_metrics_to_csv(metrics):
    with open("result_metrics.csv", "w", newline="") as csvfile:
        fieldnames = [
            "http_req_duration (ms)",
            "response_time (ms)",
            "vus (users)",
            "success_rate (%)",
            "http_reqs (req/sec)",
            "cpu_usage (%)",
            "memory_usage (%)",
            "latency (ms)",  # New column
            "throughput (req/sec)",  # New column
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # Show progress while writing to CSV
        with tqdm(total=len(metrics), desc="Saving metrics to CSV", unit="rows") as pbar:
            writer.writeheader()
            for metric in metrics:
                writer.writerow({
                    "http_req_duration (ms)": metric["http_req_duration"],
                    "response_time (ms)": metric["response_time"],
                    "vus (users)": metric["vus"],
                    "success_rate (%)": metric["success_rate"],
                    "http_reqs (req/sec)": metric["http_reqs"],
                    "cpu_usage (%)": metric["cpu_usage"],
                    "memory_usage (%)": metric["memory_usage"],
                    "latency (ms)": metric["latency"],
                    "throughput (req/sec)": metric["throughput"],
                })
                pbar.update(1)

if __name__ == "__main__":
    print("Starting load test...")
    metrics = perform_load_test()
    save_metrics_to_csv(metrics)
    print("\nLoad test completed! Metrics saved to 'result_metrics.csv'")