import express from "express";
import FileRoute from "./routes/file.route.js";

import DatabaseController from "./controllers/DatabaseController.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db = new DatabaseController();



async function main() {
    console.clear()

    const dbConnection = await db.testConnection();
    
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use("/file", FileRoute);

    app.listen(3000, () => {
        console.log("SERVER IS LISTENING");
    })
}

main();