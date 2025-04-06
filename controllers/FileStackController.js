import fs from "node:fs/promises"

class FileStackController {

    constructor(__dirname) {
        this.stackPath = __dirname + "/fileStack.json";
    }

    async init() {
        fs.writeFile(this.stackPath, JSON.stringify([]));
    }

    async getFileStack() {
        const stack = await fs.readFile(this.stackPath, {encoding: "utf-8"});
        return JSON.parse(stack);
    }

    async getTopStack() {
        const rawStack = await fs.readFile(this.stackPath, {encoding: "utf-8"});
        const stack = JSON.parse(rawStack);
        
        return stack[stack.length - 1];
    }

    async push(file) {
        let current = await this.getFileStack();
        current.push(file);
        fs.writeFile(this.stackPath, JSON.stringify(current));
    }

    async pop() {
        let current = await this.getFileStack();
        current.pop();
        fs.writeFile(this.stackPath, JSON.stringify(current));
    }

}

export default FileStackController;