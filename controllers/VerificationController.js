import cp from "node:child_process";
import FileController from "./FileSystemController.js";
import FileStackController from "./FileStackController.js";
import ExerciceController from "./ExerciceController.js";
import FunctionController from "./FunctionController.js";
import Randomizer from "./Randomizer.js";

class VerificationController {

    constructor(path, dbclient) {

        this.path = path;
        this.file = new FileController(this.path);

        this.dbclient = dbclient;
        this.fileStack = new FileStackController(this.path);
        this.exerciseController = new ExerciceController(this.dbclient);
        this.functionController = new FunctionController(this.dbclient);
        this.randomizer = new Randomizer();

        console.log('PATH ' + this.path);

    }

    async verifyPythonFunction(filename, func, args) {

        let command = "./test_python.sh " + filename + " " + func + " " + args[0] + " " + args[1];

        cp.exec(command, {cwd: this.path + "/submited"});

        let submitedResult = await this.file.getResultFileContent();

        let correctionCommand = "./correction_python.sh " + filename + " " + func + " " + args[0] + " " + args[1];
        
        cp.exec(correctionCommand, {cwd: this.path + "/correction"});
        let correctionResult = await this.file.getCorrectionFileContent();

        if (correctionResult.trim() === submitedResult.trim()) {
            return true;
        } else {
            return false;
        }
        

    }

    async verifyCFile(filename, args) {
        let command = "./test_c.sh " + filename + " " + args[0] + " " + args[1];
        console.log(command);

        await cp.exec(command, {cwd: this.path + "/submited"});

        let submitedResult = await this.file.getResultFileContent();

        let correctionCommand = "./correction_c.sh " + filename + " " + args[0] + " " + args[1];
        await cp.exec(correctionCommand, {cwd: this.path + "/correction"});

        let correctionResult = await this.file.getCorrectionFileContent();
        console.log(correctionResult.trim());
        console.log(submitedResult.trim());
        
        
        if (correctionResult.trim() === submitedResult.trim()) {
            return true;
        } else {
            return false;
        }

    }

    async checkStack() {

        const fileToVerify = await this.fileStack.getTopStack();
        console.log("CHECKING STACK...");

        if (fileToVerify == undefined) {
            console.log("EMPTY STACK");
            const waiter = setInterval(async () => {
                const fileToVerify = await this.fileStack.getTopStack();
                if (fileToVerify != undefined) {
                    clearInterval(waiter);
                    this.checkStack();
                }
            }, 1000);
        } else {

            const exercise = await this.exerciseController.getById(fileToVerify.exercise);
            const functions = await this.functionController.getByExerciseId(fileToVerify.exercise);

            console.log(exercise);
            console.log(functions);

            if (fileToVerify.filename.split(".")[1] == "py") {
                functions.forEach(async (func) => {
                    let randomArgs = [];
    
                    const funcArgs = JSON.parse(func.args);
    
                    funcArgs.forEach(arg => {
                        if (arg.type == "int") {
                            randomArgs.push(this.randomizer.getRndInteger(0, 100));
                        } else if (arg.type == "str") {
                            randomArgs.push(this.randomizer.getRndString());
                        }
                    });
    
                    console.log(randomArgs);
    
                    this.verifyPythonFunction(fileToVerify.filename, func.name, randomArgs);
    
                })
            }

        }

    }

}

export default VerificationController;