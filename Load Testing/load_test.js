import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Define custom metrics
const responseTime = new Trend('response_time', true);
const successRate = new Trend('success_rate', true);

export let options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp-up to 10 users
        { duration: '20s', target: 20 }, // Stay at 20 users
        { duration: '10s', target: 0 }, // Ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    },
};

const pages = [
    { name: 'Home', url: 'http://localhost:3000/' },
    { name: 'About', url: 'http://localhost:3000/about' },
    { name: 'Contact', url: 'http://localhost:3000/contact' },
    { name: 'Login', url: 'http://localhost:3000/account' },
    { name: 'Cart', url: 'http://localhost:3000/cart' },
    { name: 'Shop', url: 'http://localhost:3000/shop' },
    // { name: 'Checkout', url: 'http://localhost:3000/checkout' },
    { name: 'Wishlist', url: 'http://localhost:3000/wishlist' },
    { name: 'Blog', url: 'http://localhost:3000/blog' },
    // { name: 'OrderPlaced', url: 'http://localhost:3000/orderplaced' },
];

export default function () {
    for (const page of pages) {
        const res = http.get(page.url);

        // Store metrics
        responseTime.add(res.timings.duration);
        successRate.add(res.status === 200 ? 1 : 0);

        // Check response
        check(res, {
            [`${page.name} - Status is 200`]: (r) => r.status === 200,
        });

        sleep(1); // Simulate user think time
    }
}

// Handle metrics output in JSON and CSV format
export function handleSummary(data) {
    const csvHeader = 'Metric,Count,Min,Max,Avg,95th Percentile,CPU Usage (%),Memory Usage (MB)';
    const csvData = Object.keys(data.metrics).map((metric) => {
        const metricData = data.metrics[metric];
        // Placeholder values for CPU and Memory usage
        const cpuUsage = 'N/A'; // Replace with actual CPU usage data
        const memoryUsage = 'N/A'; // Replace with actual Memory usage data
        return `${metric},${metricData.values.count},${metricData.values.min},${metricData.values.max},${metricData.values.avg},${metricData.values['p(95)']},${cpuUsage},${memoryUsage}`;
    });

    const csvContent = [csvHeader, ...csvData].join('\n');

    return {
        'result_metrics.json': JSON.stringify(data, null, 2), // Save metrics to JSON file
        'result_metrics.csv': csvContent, // Save metrics to CSV file
    };
}