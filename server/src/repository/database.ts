import * as mongodb from "mongodb";
import { Student } from "../model/student";
import { Teacher } from "../model/teacher";
import { Admin } from "../model/admin";
import { Course } from "../model/course";

export const collections: {
    students?: mongodb.Collection<Student>;
    teachers?: mongodb.Collection<Teacher>;
    admins?: mongodb.Collection<Admin>;
    courses?: mongodb.Collection<Course>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const studentsCollection = db.collection<Student>("students");
    const teachersCollection = db.collection<Teacher>("teachers");
    const adminsCollection = db.collection<Admin>("admins");
    const coursesCollection = db.collection<Course>("courses");

    collections.students = studentsCollection;
    collections.teachers = teachersCollection;
    collections.admins = adminsCollection;
    collections.courses = coursesCollection;
}

async function applySchemaValidation(db: mongodb.Db) {

    const schemaStudent = {
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
    }

    const schemaTeacher = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "department"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                department: {
                    bsonType: "string",
                    description: "'faculty' is required and is a string",
                    minLength: 5
                }
            },
        },
    };

    const schemaCourse = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "description", "teacher_id", "timetable", 
                "room", "student_limit", "student_ids", "accepted"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                    minLength: 5
                },
                teacher_id: {
                    bsonType: "string",
                },
                timetable: {
                    bsonType: "string",
                },
                room: {
                    bsonType: "string",
                },
                student_limit: {
                    bsonType: "number",
                },
                student_ids: {
                    bsonType: "string[]",
                },
                accepted: {
                    bsonType: "boolean",
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "students",
        validator: schemaStudent
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
           await db.createCollection("students", {validator: schemaStudent});
        }
    });

    await db.command({
        collMod: "teachers",
        validator: schemaTeacher
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
             await db.createCollection("teachers" , {validator: schemaTeacher});
        }
    });

    await db.command({
        collMod: "courses",
        validator: schemaCourse,
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("courses" , {validator: schemaCourse});
        }
    });
}