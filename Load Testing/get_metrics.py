import psutil
import time
import json

# Function to monitor CPU and memory usage
def monitor_resources():
    cpu_usage = psutil.cpu_percent(interval=1)  # CPU usage percentage
    memory_info = psutil.virtual_memory()  # Memory usage details
    memory_usage = memory_info.used / (1024 * 1024)  # Convert to MB
    return cpu_usage, memory_usage

# Function to simulate getting data for each call
def get_metrics_for_calls():
    metrics = []
    with open('result_metrics.json', 'r') as f:
        data = json.load(f)

    for metric_name, metric_data in data['metrics'].items():
        cpu_usage, memory_usage = monitor_resources()
        metric_values = metric_data['values']

        # Safely access the 'count' key if it exists
        count = metric_values.get('count', 'N/A')

        metrics.append({
            'metric': metric_name,
            'count': count,
            'min': metric_values.get('min', 'N/A'),
            'max': metric_values.get('max', 'N/A'),
            'avg': metric_values.get('avg', 'N/A'),
            '95th_percentile': metric_values.get('p(95)', 'N/A'),
            'cpu_usage': cpu_usage,
            'memory_usage': memory_usage
        })

    return metrics

# Save the metrics to a new JSON file
def save_metrics_to_file(metrics):
    with open('enhanced_metrics.json', 'w') as f:
        json.dump(metrics, f, indent=2)

if __name__ == "__main__":
    metrics = get_metrics_for_calls()
    save_metrics_to_file(metrics)
    print("Enhanced metrics with CPU and memory usage saved to 'enhanced_metrics.json'")