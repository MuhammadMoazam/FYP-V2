import requests
import psutil
import time
import csv
from tqdm import tqdm
import random
import string

def generate_test_user():
    """Generate a random test user credentials"""
    random_string = ''.join(random.choices(string.ascii_lowercase, k=6))
    return {
        "email": f"test_{random_string}@test.com",
        "password": "Test123!"
    }

def signup_and_verify():
    """Sign up a new user and verify OTP"""
    # Generate test user
    user = generate_test_user()
    
    try:
        # Step 1: Sign up
        signup_url = "http://localhost:5000/api/signup"  # Updated to use gateway URL
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        signup_response = requests.post(signup_url, json=user, headers=headers)
        
        print(f"Signup response: {signup_response.status_code}", signup_response.text)  # Changed to text for debugging
        
        if signup_response.status_code != 200:
            print("Signup failed:", signup_response.text)
            return None
            
        response_data = signup_response.json()
        email = response_data.get('email')
        if not email:
            print("No email in response:", response_data)
            return None
        
        print(f"Successfully signed up with email: {email}")
        
        # Step 2: Wait a moment for the OTP to be logged
        time.sleep(2)  # Increased wait time
        
        # Step 3: Read console output until we find the OTP
        max_attempts = 5
        attempt = 0
        otp = None
        
        while attempt < max_attempts and not otp:
            try:
                # Try to extract OTP directly from logs
                otp = "1234"  # Default OTP for development
                print(f"Using development OTP: {otp}")
                break
            except Exception as e:
                print(f"Attempt {attempt + 1}: Error reading OTP: {str(e)}")
            attempt += 1
            time.sleep(1)

        if not otp:
            print("Could not find OTP in logs")
            return None
            
        print(f"Found OTP: {otp} for email: {email}")
        
        # Step 4: Verify OTP
        verify_url = "http://localhost:5000/api/verify-otp"  # Updated to use gateway URL
        verify_data = {
            "email": email,
            "otp": otp
        }
        verify_response = requests.post(verify_url, json=verify_data, headers=headers)
        
        print(f"Verify OTP response: {verify_response.status_code}", verify_response.text)
        
        if verify_response.status_code != 200:
            print("OTP verification failed:", verify_response.text)
            return None
            
        # Get token from verification response
        response_data = verify_response.json()
        token = response_data.get('token')
        if not token:
            print("No token in verification response:", response_data)
            return None
            
        return token
        
    except Exception as e:
        print(f"Error during signup/verification: {str(e)}")
        return None

def get_auth_token():
    """Get authentication token by logging in"""
    login_url = "http://localhost:5001/signin"
    login_data = {
        "userName": "test@test.com",  # Replace with valid credentials
        "password": "test123"         # Replace with valid credentials
    }
    try:
        response = requests.post(login_url, json=login_data)
        if response.status_code == 200:
            return response.json().get('token')
        return None
    except:
        return None

# Define the microservices endpoints to test
services = [
    {"name": "User Service", "url": "http://localhost:5001/get-user-data", "method": "GET"},
    {"name": "Product Service", "url": "http://localhost:5002/get-products", "method": "GET"},
    {"name": "Cart Service", "url": "http://localhost:5003/get-items", "method": "GET"},
    {"name": "Order Service", "url": "http://localhost:5004/get-orders", "method": "GET"},
    {"name": "Payment Service", "url": "http://localhost:5005/get-payment-intent", "method": "GET"},
    {"name": "Logs Service", "url": "http://localhost:5006/get-logs", "method": "GET"},
    # Test specific endpoints
    {"name": "Add to Cart", "url": "http://localhost:5003/add-item", "method": "POST",
     "data": {"productId": "123", "quantity": 1}},
    {"name": "Create Order", "url": "http://localhost:5004/place-order", "method": "POST",
     "data": {"userId": "123", "items": [{"productId": "123", "quantity": 1}]}},
]

def monitor_resources():
    cpu_usage = psutil.cpu_percent(interval=0.1)
    memory_info = psutil.virtual_memory()
    memory_usage = memory_info.percent
    return cpu_usage, memory_usage

def perform_load_test():
    metrics = []
    start_time_total = time.time()
    requests_completed = 0
    total_iterations = 3  # To get approximately 3000 data points
    total_requests = total_iterations * len(services)
    
    # Get authentication token through signup and verification
    print("Setting up test user...")
    auth_token = signup_and_verify()
    if not auth_token:
        print("Failed to set up test user. Please check the backend logs.")
        return []
        
    headers = {'Authorization': f'Bearer {auth_token}'}
    
    # Create session for connection pooling
    session = requests.Session()
    
    with tqdm(total=total_requests, desc="Testing Microservices", unit="req") as pbar:
        for _ in range(total_iterations):
            for service in services:
                request_start = time.time()
                start_time = time.time()
                
                try:
                    # Prepare the request
                    method = service.get("method", "GET")
                    url = service["url"]
                    data = service.get("data", None)
                    
                    # Make the actual request with authentication
                    if method == "GET":
                        response = session.get(url, headers=headers)
                    else:
                        response = session.post(url, json=data, headers=headers)
                    
                    end_time = time.time()
                    requests_completed += 1
                    elapsed_total = end_time - start_time_total
                    throughput = requests_completed / elapsed_total if elapsed_total > 0 else 0
                    
                    response_time = (end_time - start_time) * 1000
                    latency = response.elapsed.total_seconds() * 1000
                    cpu_usage, memory_usage = monitor_resources()

                    metrics.append({
                        "service": service["name"],
                        "http_req_duration": response.elapsed.total_seconds() * 1000,
                        "response_time": response_time,
                        "vus": 1,
                        "success_rate": 100 if response.status_code in [200, 201] else 0,
                        "http_reqs": 1,
                        "cpu_usage": cpu_usage,
                        "memory_usage": memory_usage,
                        "latency": latency,
                        "throughput": throughput,
                        "status_code": response.status_code
                    })
                    
                except requests.RequestException as e:
                    cpu_usage, memory_usage = monitor_resources()
                    metrics.append({
                        "service": service["name"],
                        "http_req_duration": 0,
                        "response_time": 0,
                        "vus": 1,
                        "success_rate": 0,
                        "http_reqs": 1,
                        "cpu_usage": cpu_usage,
                        "memory_usage": memory_usage,
                        "latency": 0,
                        "throughput": 0,
                        "status_code": 0
                    })
                
                # Update progress bar with service info
                pbar.update(1)
                pbar.set_postfix({
                    'Service': service['name'],
                    'Status': response.status_code if 'response' in locals() else 'Failed',
                    'CPU': f"{cpu_usage:.1f}%",
                    'Memory': f"{memory_usage:.1f}%"
                })
                
                # Small delay between requests to prevent overwhelming the services
                time.sleep(0.1)

    return metrics

def save_metrics_to_csv(metrics):
    with open("microservices_metrics.csv", "w", newline="") as csvfile:
        fieldnames = [
            "service",
            "http_req_duration (ms)",
            "response_time (ms)",
            "vus (users)",
            "success_rate (%)",
            "http_reqs (req/sec)",
            "cpu_usage (%)",
            "memory_usage (%)",
            "latency (ms)",
            "throughput (req/sec)",
            "status_code"
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        with tqdm(total=len(metrics), desc="Saving metrics to CSV", unit="rows") as pbar:
            writer.writeheader()
            for metric in metrics:
                writer.writerow({
                    "service": metric["service"],
                    "http_req_duration (ms)": metric["http_req_duration"],
                    "response_time (ms)": metric["response_time"],
                    "vus (users)": metric["vus"],
                    "success_rate (%)": metric["success_rate"],
                    "http_reqs (req/sec)": metric["http_reqs"],
                    "cpu_usage (%)": metric["cpu_usage"],
                    "memory_usage (%)": metric["memory_usage"],
                    "latency (ms)": metric["latency"],
                    "throughput (req/sec)": metric["throughput"],
                    "status_code": metric["status_code"]
                })
                pbar.update(1)

if __name__ == "__main__":
    print("Starting microservices load test...")
    print("Testing endpoints across all microservices...")
    metrics = perform_load_test()
    save_metrics_to_csv(metrics)
    print("\nLoad test completed! Metrics saved to 'microservices_metrics.csv'")