import * as mongodb from "mongodb";

export interface User {
    username : string;
    password : string;
    activated: boolean;
    _id?: mongodb.ObjectId;
}