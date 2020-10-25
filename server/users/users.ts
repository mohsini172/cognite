import express from 'express';
import { UserModel } from '../models/user.model'
export const router = express.Router();

router.get('/', async (req: any, res: any) => {
    try {
        const user = await UserModel.find();
        return res.status(200).send(user);
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong while registering");
    }
});

