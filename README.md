# Code Sprint

This is the backend for a comprehensive e-learning platform designed for learning various programming languages and practicing competitive coding.



## Features
* Course management (add, view, update, delete)
* Amazon S3 integration for course content storage
* Multiple payment gateway integrations for course and premium subscriptions
* Problem management system with difficulty levels
* Real-time chat functionality using Socket.IO
* Admin dashboard with user statistics, instructor performance metrics, and problem-solving data
* Code compilation and test case validation system

## Technology Stack
* Node.js
* Express.js
* MongoDB
* REST API
* Nodemailer
* AWS S3
* Multer
* Socket.IO
* Docker
* Nginx (for deployment)

## Getting Started

### Prerequisites

* Node.js (v14 or later)
* MongoDB
* AWS account (for S3 bucket)
* Docker (optional)

### installation

Clone the repository:

```bash
git clone https://github.com/NischalKShaj/code_sprint_backend
cd code_sprint_backend
```

Install dependencies:
``` bash
npm install
```

Set up environment variables: Create a .env file in the root directory and add the following variables:
```bash
PORT=4000
MONGODB_URI=your_mongodb_connection_string
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```
Start the server:
```bash
npm start
```
