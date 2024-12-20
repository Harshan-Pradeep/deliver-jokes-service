
# deliver-jokes-service

A microservice that delivers approved jokes to users upon request. It provides an API to fetch random jokes based on different types and stores jokes approved by the moderator.

## Badges

![Build Status](https://github.com/Harshan-Pradeep/deliver-jokes-service/actions/workflows/node.js.yml/badge.svg?branch=main)


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contact Information](#contact-information)

## Prerequisites

- **Node.js**: 22.x
- **npm**

## Installation

```bash
# Clone the repository
git clone https://github.com/Harshan-Pradeep/deliver-jokes-service.git

# Navigate into the directory
cd deliver-jokes-service

# Install dependencies
npm install
```

## Usage

```
# Start the development server
npm run start:dev
```
Access the application at `http://localhost:3000` | [http://ec2-13-51-175-32.eu-north-1.compute.amazonaws.com](http://ec2-13-60-197-178.eu-north-1.compute.amazonaws.com/)

## Deployment

### AWS EC2 Setup

- **Instance Type**: t3.micro
- **Operating System**: Ubuntu 24.04 LTS
- **AWS Services Used**: EC2, RDS(MySQL)

### Deployment Steps

1. **Launch an EC2 Instance**:
   - Go to the AWS Management Console and launch a new EC2 instance with the specified instance type and operating system.
2. **Configure Security Groups**:
   - 80 for HTTP
3. **Install Required Software**:
   - Install Node.js 22.x, Nginx, pm2 and npm
4. **Clone the Repository**:
   ```bash
   git clone https://github.com/Harshan-Pradeep/deliver-jokes-service.git
   ```
5. **Install Dependencies**:
   ```bash
   cd deliver-jokes-service
   npm install
   ```
6. **Set Up Environment Variables**:
   - Create a `.env` file with the required environment variables (see [Environment Variables](#environment-variables)).
7. **Start the Application**:
   ```bash
   npm run start
   ```
8. **Set Up AWS RDS**:
   - Create a MySQL database instance on AWS RDS.
   - Configure security groups to allow the EC2 instance to access the RDS instance.
9. **Configure a Process Manager **:
   - Use PM2 to keep the application running in the background.


## CI/CD Pipeline

The project utilizes GitHub Actions for continuous integration and deployment.

- **Workflow File**: `node.js.yml`
- **Triggers**: On push to the `main` branch
- **Pipeline Steps**:
  - **Checkout Code**: Retrieves the latest code from the repository.
  - **Install Dependencies**: Runs `npm install`.
  - **Build Application**: Prepares the application for deployment.
  - **Deploy to AWS EC2**: Uses SSH or AWS services to deploy the updated code.

## Testing

Currently, there are no tests included. Future updates will provide unit and integration tests using a testing framework like Jest.

## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```env
MYSQL_HOST=your_mysql_host
MYSQL_PORT=3306
MYSQL_USERNAME=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=your_database_name
```

An example `.env.example` file is provided for reference.

## API Documentation

The API is documented using Swagger.

Access the API documentation at:

[http://ec2-13-60-197-178.eu-north-1.compute.amazonaws.com/api-docs](http://ec2-13-60-197-178.eu-north-1.compute.amazonaws.com/api-docs)

## Contact Information

- **Name**: Harshan Pradeep
- **LinkedIn**: [https://www.linkedin.com/in/harshan-pradeep-40712a29b/](https://www.linkedin.com/in/harshan-pradeep-40712a29b/)
