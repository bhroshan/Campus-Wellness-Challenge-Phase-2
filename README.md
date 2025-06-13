# Campus Wellness Challenge Platform - Phase 1 - (Group 3)

This Phase 1 for this project is a web application designed to facilitate wellness challenges within a campus environment. It allows coordinators to create and manage challenges, while participants can view and join these challenges. The application is built using Node.js, Express, MongoDB, and React.

## Team Members
- **Roshan Bhandary (200538067
)**
- **Muhammad Salman Zahid (200537983)**
## Features
- **User Authentication**: Secure login and registration with JWT.
- **Coordinator Dashboard**: Create, Edit, View and Delete challenges.
- **Participant Dashboard**: View and join/leave challenges.

## Setup Instructions
1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/bhroshan/campus-wellness-program-challenge.git
   cd campus-wellness-program-challenge
    ``` 
2. **Environment Variables**:
   - copy the `.env.example` file to `.env` in the root directory.
   - Update the `.env` file with your specific configurations, such as MONGO_URI and JWT_SECRET.
   - You can use this URL for MONGO_URI: 
    ```
    mongodb+srv://roshan1234:roshan1234@campus-wellness-cluster.wie7svg.mongodb.net/Campus-Wellness-Challenge-Platform?retryWrites=true&w=majority&appName=Campus-Wellness-Cluster
   ```

3. **Install Dependencies**:
   - For backend:
     ```bash
     npm install
     ```
   - For frontend:
     ```bash
     cd frontend
     npm install
     ```
4. **Serve the Application**:
   ```bash
    npm run dev
    ```
