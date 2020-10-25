import express from 'express';
import { UserModel } from '../models/user.model'
export const router = express.Router();

router.post('/login', async (req: any, res: any) => {
    try {
        if (!req.body.username) return res.status(400).send("No username provided");
        const user = await UserModel.findOne({
            username: req.body.username
        })
        if (!user) return res.status(403).send("Invalid username provided");
        return res.status(200).send(user);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong while registering");
    }
});

router.post('/signup', async (req: any, res: any) => {
    try {
        if (!req.body?.username || !req.body?.name) return res.status(400).send("Name and username are required");
        const newUser = new UserModel({
            name: req.body?.name,
            username: req.body?.username
        })
        const user = await newUser.save();
        if (!user) return res.status(500).send("Something went wrong while registering");
        return res.status(201).send(user);
    } catch (error) {
        console.error(error)
        res.status(500).send("Something went wrong while registering");
    }
});

