# WarrantyIT - Product Warranty Management

## Project Description
This is a prototype application that allows users to manage product warranties. Users can create accounts, log in, add products with warranty details, and view their products. The system includes a frontend form built with React, a backend API using Node.js and Express.js, and a relational database schema using PostgreSQL.

---

## Features

- **User Signup:** Users can create an account by providing their name, email, and password.
- **User Login:** Registered users can log in with their credentials to access the system.
- **Add Product:** Users can add a product with details such as Product Name, Brand, Type, Warranty Period, and Start Date.
- **Input Validation:** Both frontend and backend validate input fields to ensure data integrity.
- **Product Storage:** Product details are stored in a PostgreSQL database linked to the user.
- **Retrieve Products:** Users can view all products they have added, displayed on their profile or dashboard.

---

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** PostgreSQL  
- **Other Libraries/Tools:** Axios, bcrypt, JWT, dotenv  

---
### Installation & Setup

### Backend:
- cd server
- npm install
- npm start

### Frontend:
- cd client
- npm install
- npm run dev