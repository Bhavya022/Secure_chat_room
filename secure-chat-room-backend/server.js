const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware')
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); 

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const chatRoomRoutes = require('./routes/chatRoomRoutes');
const messageRoutes = require('./routes/messageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const friendRequestRoutes = require('./routes/friendRequestRoutes');
const InvitationRoutes = require('./routes/InvitationRoutes')
const JoinRoomRoutes = require('./routes/JoinRoomRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/chatrooms', chatRoomRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/friend-requests', friendRequestRoutes);
app.use('/api/Invitation', InvitationRoutes); 
app.use('/api/JoinRoom',JoinRoomRoutes) 
app.get('/protected', authMiddleware, (req, res) => {
    // This route is protected and requires authentication
    res.status(200).json({ message: 'Authenticated' });
  });
  
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ room }) => {
        socket.join(room);
    });
    socket.on('chatMessage', ({ room, message }) => {
        io.to(room).emit('message', message);
    });
    socket.on('disconnect', () => {});
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    } else {
        console.log('Database connected successfully');
        connection.release();
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
});
