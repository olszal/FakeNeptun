import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./repository/database";
import { authRouter } from "./rest/auth.routes";
import { studentRouter } from "./rest/student.routes";
import { teacherRouter } from "./rest/teacher.routes";
import { courseRouter } from "./rest/course.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/login", authRouter);
    app.use("/students", studentRouter);
    app.use("/teachers", teacherRouter);
    app.use("/courses", courseRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200...`);
    });
  })
  .catch((error) => console.error(error));