# Expense Tracker (GraphQL + MERN)

## 📌 Project Overview
The **Expense Tracker** is a full-stack web application that allows users to manage their expenses effectively. Users can add, update, and delete transactions while visualizing expense statistics with interactive charts.

## 🚀 Features
- ✅ **User Authentication** (Signup, Login, Logout)
- ✅ **Expense Management** (Add, Update, Delete Transactions)
- ✅ **GraphQL API** (Efficient Data Fetching)
- ✅ **Data Visualization** (Dynamic Charts for Expense Tracking)
- ✅ **File Upload** (Profile Pictures)
- ✅ **State Management** (React Context / Zustand)

## 🛠️ Tech Stack
```bash
Frontend:
- React.js (Hooks, Context API)
- Apollo Client (GraphQL Query & Mutation Handling)
- Tailwind CSS (Responsive UI)
- Chart.js (Expense Visualization)

Backend:
- Node.js (Server-side Logic)
- Express.js (REST & GraphQL API Handling)
- Apollo Server (GraphQL API)
- MongoDB (Database)
- Mongoose (ODM for MongoDB)
- JSON Web Token (JWT for Authentication)

DevOps & Tools:
- Git & GitHub (Version Control)
- Nodemon (Backend Auto-Restart)
- Cross-Env (Environment Variable Management)



🔧 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

2️⃣ Install Dependencies
Backend
sh
Copy
Edit
cd BackEnd
npm install
Frontend
sh
Copy
Edit
cd ../FrontEnd
npm install

3️⃣ Set Up Environment Variables
Create a .env file in BackEnd/ and FrontEnd/ with required configurations.

env
Copy
Edit
# Backend/.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
env
Copy
Edit
# FrontEnd/.env
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:5000/graphql

4️⃣ Start the Application
Backend
sh
Copy
Edit
cd BackEnd
npm start
Frontend
sh
Copy
Edit
cd ../FrontEnd
npm start

