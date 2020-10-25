import express from 'express';
import { ChatModel } from '../models/chat.model';
export const router = express.Router({ mergeParams: true });

router.get('/', async (req: any, res: any) => {
    const userId = req.params.userId;
    try {
        const chats = await ChatModel.find({
            '$or': [
                { 'user1': userId },
                { 'user2': userId }
            ]
        }).populate('user1 user2');
        return res.status(200).send(chats);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong while registering");
    }
});

router.get('/:id', async (req: any, res: any) => {
    const chatId = req.params.id;
    const userId = req.params.userId;
    try {
        const chat = await ChatModel.findOne({
            _id: chatId,
            '$or': [
                { 'user1': userId },
                { 'user2': userId }
            ]
        }).populate('user1 user2');
        //@ts-ignore
        return res.status(200).send(chat?.texts || []);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong while registering");
    }
});

router.post('/', async (req: any, res: any) => {
    if (!req?.body?.contactId) return res.status(400).send("contactId is required")
    const userId = req.params.userId;
    const contactId = req.body?.contactId;
    try {
        let chat = await ChatModel.findOne({
            '$or': [
                { 'user1': userId, 'user2': contactId },
                { 'user2': userId, 'user1': contactId }
            ]
        }).populate('user1 user2');
        if (chat) return res.status(200).send(chat);
        chat = new ChatModel({
            'user1': userId,
            'user2': contactId,
            'texts': []
        })
        await chat.save();
        chat = await ChatModel.findOne({
            '$or': [
                { 'user1': userId, 'user2': contactId },
                { 'user2': userId, 'user1': contactId }
            ]
        }).populate('user1 user2');

        res.status(201).send(chat);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong while registering");
    }
});

