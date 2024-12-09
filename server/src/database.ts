import * as mongodb from "mongodb";
import { Student } from "./student";

export const collections: {
    students?: mongodb.Collection<Student>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const studentsCollection = db.collection<Student>("students");
    collections.students = studentsCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "faculty", "semester"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                faculty: {
                    bsonType: "string",
                    description: "'faculty' is required and is a string",
                    minLength: 5
                },
                semester: {
                    bsonType: "decimal",
                    description: "'semester' is required and is a number",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "students",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("students", {validator: jsonSchema});
        }
    });
}