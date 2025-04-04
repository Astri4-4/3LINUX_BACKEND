import express from "express";
import FileRoute from "./routes/file.route.js";
import dotenv from "dotenv";

import DatabaseController from "./controllers/DatabaseController.js";
import ExerciceController from "./controllers/ExerciceController.js";
import UserController from "./controllers/UserController.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db = new DatabaseController();

dotenv.config();

async function main() {
    console.clear()

    const dbConnection = await db.testConnection();

    const user = new UserController(db.client);
    user.login("tamere", "babacool");

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use("/file", FileRoute);

    app.listen(3000, () => {
        console.log("SERVER IS LISTENING");
    })
}

main();