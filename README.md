# Urban Clothe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# E-Commerce Application Deployment Guide

## Prerequisites

- Azure Virtual Machine (Ubuntu 20.04 LTS or later)
- Domain name pointing to your Azure VM
- Docker and Docker Compose installed
- SSL certificate (Let's Encrypt)

## Deployment Steps

1. Clone the repository to your Azure VM:
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

2. Configure Environment Variables:
   - Update `.env.production` files in each service directory
   - Set appropriate MongoDB credentials
   - Update JWT secrets
   - Configure API URLs

3. SSL Certificate Setup:
```bash
# Install certbot
sudo apt-get install certbot -y

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates
sudo mkdir -p ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/
```

4. Update Configuration:
   - Replace YOUR_AZURE_VM_DOMAIN in nginx.conf with your actual domain
   - Update MongoDB credentials in docker-compose.yaml
   - Configure JWT secrets in user-service

5. Deploy the Application:
```bash
# Start the services
sudo docker-compose up -d

# Verify deployment
sudo docker-compose ps
```

6. Monitor the Application:
   - Check service health endpoints
   - Monitor logs with `docker-compose logs -f`
   - Set up monitoring tools (optional)

## Service URLs

- Frontend: https://your-domain.com
- Product Service: https://your-domain.com/api/products
- Cart Service: https://your-domain.com/api/cart
- User Service: https://your-domain.com/api/auth
- Order Service: https://your-domain.com/api/orders

## Maintenance

### SSL Certificate Renewal
```bash
sudo certbot renew
```

### Updating the Application
```bash
git pull
sudo docker-compose up -d --build
```

### Backup MongoDB Data
```bash
docker exec mongodb mongodump --out /dump
docker cp mongodb:/dump ./backup
```

## Troubleshooting

1. Check service logs:
```bash
docker-compose logs [service-name]
```

2. Verify network connectivity:
```bash
docker network ls
docker network inspect microservices-network
```

3. Check container health:
```bash
docker ps --format "{{.Names}}: {{.Status}}"
```

## Security Considerations

1. Regularly update dependencies
2. Monitor for security vulnerabilities
3. Keep SSL certificates up to date
4. Implement rate limiting
5. Use secure environment variables
6. Regular backups of MongoDB data
