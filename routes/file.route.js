import { Router } from "express";
import FileController from "../controllers/FileController.js";
import FileStack from "../controllers/FileStackController.js";
import VerificationController from "../controllers/VerificationController.js";
import multer from "multer";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const fs = new FileController(null);
const stack = new FileStack(__dirname + "/../");
const verification = new VerificationController(__dirname + "/..")
const upload = multer({
    dest: __dirname + "/../buffer"
})

router.post('/', upload.single('file'), (req, res) => {
    const file = req.file;
    const title = req.body.title;

    fs.move(file.path, __dirname + "/../submited/" + file.originalname);

    stack.push(file.originalname);

    if (file.originalname.split(".")[1] == "py") {
        const result = verification.verifyPythonFile(file.originalname.split(".")[0], "add", [5, 55]);

        fs.remove(__dirname + "/../submited/" + file.originalname);

        if (result == true) {
            res.send("PASS")
        } else {
            res.send("FAILED")
        }
    }
    
})

export default router;