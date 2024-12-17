import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../repository/database";

export const teacherRouter = express.Router();
teacherRouter.use(express.json());

teacherRouter.get("/", async (_req, res) => {
    try {
        const teachers = await collections?.teachers?.find({}).toArray();
        res.status(200).send(teachers);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

teacherRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const teacher = await collections?.teachers?.findOne(query);

        if (teacher) {
            res.status(200).send(teacher);
        } else {
            res.status(404).send(`Failed to find a teacher: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a teacher: ID ${req?.params?.id}`);
    }
});

teacherRouter.post("/", async (req, res) => {
    try {
        const teacher = req.body;
        const result = await collections?.teachers?.insertOne(teacher);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new teacher: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new teacher.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

teacherRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const teacher = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.teachers?.updateOne(query, { $set: teacher });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a teacher: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a teacher: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a teacher: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

teacherRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.teachers?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a teacher: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a teacher: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a teacher: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});