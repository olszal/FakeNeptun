import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../repository/database";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
        const result1 = await collections?.students?.findOne(user);
        const result2 = await collections?.teachers?.findOne(user);
        const result3 = await collections?.admins?.findOne(user);

        if (result1) {
            res.status(200).send(result1);
        } 
        else if (result2) {
            res.status(200).send(result2);
        } 
        else if (result3) {
            res.status(200).send(result3);
        } 
        else {
            console.log(`Wrong password or username!`);
            res.status(404).send(`Wrong password or username!`);
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});