import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { router as authRoutes } from './auth/auth';
import { router as usersRoutes } from './users/users';
import { router as chatsRoutes } from './chat/chat';
import bodyParser from 'body-parser';
import io from 'socket.io';
import './db/mongoose';
import { initSocket } from './chat/chat.socket';

const app = express();
const server = createServer(app);
const socket = io(server);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/users/:userId/chats', chatsRoutes);

socket.on('connection', (socket: any) => {
    initSocket(socket);
})

server.listen(3001, function () {
    console.log('App is listening on port 3001!');
});