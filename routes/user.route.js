import { Router } from "express";
import UserController from "../controllers/UserController.js";
import DatabaseController from "../controllers/DatabaseController.js";

const router = Router();
const databaseController = new DatabaseController();
databaseController.testConnection();
const userController = new UserController(databaseController.client)


// CREATE USER
router.post("/", async (req, res) => {

    const body = req.body;

    const query = await userController.create(body.name, body.role, body.email, body.passwd);

    console.log(query)

    if (query == true) {
        res.sendStatus(200)
    } else {
        res.sendStatus(500);
    }
    
    console.log(body)

})

router.post("/login", async (req, res) => {
    const body = req.body;

    const query = await userController.login(body.email, body.passwd);

    if (query != false) {
        res.status(200).json({"token" : query})
    } else {
        res.sendStatus(401);
    }

})

export default router;