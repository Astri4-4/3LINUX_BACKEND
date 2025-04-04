import cp from "node:child_process";
import FileController from "./FileSystemController.js";

class VerificationController {

    constructor(path) {

        this.path = path;
        this.file = new FileController(this.path);

        console.log('PATH ' + this.path);

    }

    async verifyPythonFile(filename, func, args) {

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

}

export default VerificationController;