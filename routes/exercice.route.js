import { Router } from "express";
import ExerciceController from "../controllers/ExerciceController.js";
import FunctionController from "../controllers/FunctionController.js";
import DatabaseController from "../controllers/DatabaseController.js";

const router = Router();
const databaseController = new DatabaseController();
databaseController.testConnection(); 
const exerciseController = new ExerciceController(databaseController.client);
const functionController = new FunctionController(databaseController.client);

router.post("/", async (req,res) => {
    const body = req.body;

    const exercise = {
        "name": body.name,
        "language": body.language,
        "instruction": body.instruction
    }

    var query = await exerciseController.create(exercise.name, exercise.instruction, exercise.language)

    if (query != false) {
        const functions = body.functions;
    
        functions.forEach(async (func) => {
            console.log(func.name);
            console.log(func.args);

            const functionQuery = await functionController.create(query.rows[0].id, func.name, JSON.stringify(func.args));

            if (functionQuery != false) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });

        
    }

    

})

router.get("/:id", async (req, res) => {

    const id = req.params.id;

    const query = await exerciseController.getById(id);

    if (query != false) {
        res.status(200).json(query);
    } else {
        res.status(500);
    }

})

export default router;