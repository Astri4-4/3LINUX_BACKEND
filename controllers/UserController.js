import bcrypt from "bcrypt";

class UserController {

    constructor(dbclient) {

        this.dbclient = dbclient;

    }

    async create(name, role, email, password) {

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (name, role, email, password) VALUES ($1, $2, $3, $4)";
        const values = [name, role, email, hashedPassword];

        this.dbclient.query(query, values);

    }

}

export default UserController;