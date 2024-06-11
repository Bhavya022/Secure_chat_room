# Secure_chat_room
A secure chat room application that allows users to register, create chat rooms, join chat rooms, and send friend requests. This project is built using Node.js for the backend and vanilla JavaScript, HTML, and CSS for the frontend.

## Table of Contents
Features
Getting Started
Prerequisites
Installation
Running the Server
Usage
Frontend
Backend Endpoints
Folder Structure
## Screenshots
C:\Users\Dell\Pictures\Screenshots\Screenshot (237).png
Contributing
Features
User Registration and Login
Create Chat Rooms
Join Chat Rooms
Send Friend Requests
View and Manage Chat Rooms
Getting Started
## Prerequisites
Node.js and npm installed on your machine.
MySQL database server set up.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/secure-chat-room.git
cd secure-chat-room
Install Dependencies

## For the backend:

bash
Copy code
cd secure-chat-room-backend
npm install
For the frontend:

bash
Copy code
cd ../secure-chat-room-frontend
npm install
## Set Up the Database

Import the provided SQL script (database.sql) to create the necessary tables.
Update the database configuration in config/db.js with your MySQL credentials.
javascript
Copy code
// Example configuration in config/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'chat_room_db'
});

module.exports = db;
Running the Server
Start the Backend Server

bash
Copy code
cd secure-chat-room-backend
npm start
Serve the Frontend

You can use any local server tool to serve the frontend files, or just open index.html in your browser.

Usage
## Frontend
Open index.html in your browser to start the application.

Main Pages
Login Page: Users can log in using their username and password.
Register Page: New users can register by providing their details.
Dashboard: After logging in, users can navigate to various features like creating or joining chat rooms.
Create Room Page: Users can create a new chat room by specifying the room ID, prime member, participants, and maximum capacity.
Join Room Page: Users can join an existing chat room by providing the room ID and their user ID.
Send Friend Request Page: Users can send a friend request by providing their user ID and the friend’s user ID.
Backend Endpoints
User Registration: POST /auth/api/register
User Login: POST /api/auth/login
Create Chat Room: POST /api/chatroom/create
Join Chat Room: POST /api/JoinRoom/join
Send Friend Request: POST /api/sendfriendrequest/send
