import fs from "node:fs/promises";

class FileController {

    constructor(path) {
        this.path = path
    }

    async getAllSubmitedFile() {
        fs.readdir(this.path + "/submited").then(data => {
            return data;
        });
    }

    async getResultFileContent() {
        const result = await fs.readFile(this.path + "/submited/result.txt", {encoding: "utf-8"});
        return result;
    }

    async getCorrectionFileContent() {
        const result = await fs.readFile(this.path + "/correction/correction.txt", {encoding: "utf-8"});
        return result;
    }

    async move(filePath, newPath) {

        fs.rename(filePath, newPath).then((err, data) => {
            return true;
        })

    }

    async remove(filePath) {
        fs.rm(filePath).then(() => {
            return
        })
    }

}

export default FileController;