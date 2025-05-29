#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create SSL directory
sudo mkdir -p /etc/ssl/private
sudo mkdir -p ssl

# Install Certbot for SSL
sudo apt-get install certbot -y

# Generate SSL certificate (replace YOUR_DOMAIN with actual domain)
sudo certbot certonly --standalone -d YOUR_DOMAIN --agree-tos --email your-email@example.com

# Copy SSL certificates
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem ssl/

# Start services
sudo docker-compose up -d
