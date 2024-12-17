import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../repository/database";

export const courseRouter = express.Router();
courseRouter.use(express.json());

courseRouter.get("/", async (_req, res) => {
    try {
        const courses = await collections?.courses?.find({}).toArray();
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

courseRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const course = await collections?.courses?.findOne(query);

        if (course) {
            res.status(200).send(course);
        } else {
            res.status(404).send(`Failed to find a course: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a course: ID ${req?.params?.id}`);
    }
});

courseRouter.post("/", async (req, res) => {
    try {
        const course = req.body;
        const result = await collections?.courses?.insertOne(course);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new course: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new course.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

courseRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const course = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.courses?.updateOne(query, { $set: course });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a course: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a course: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a course: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

courseRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.courses?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a course: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a course: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a course: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});