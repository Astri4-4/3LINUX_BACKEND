import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {

    constructor(dbclient) {

        this.dbclient = dbclient;

    }

    async create(name, role, email, passwd) {

        const hashedPassword = await bcrypt.hash(passwd, 10);
        var query = "INSERT INTO users (name, role, email, password) VALUES ($1, $2, $3, $4)";
        var values = [name, role, email, hashedPassword];

        try {
            await this.dbclient.query(query, values).catch(err => console.log(err.code));
            return true;
        } catch (err) {
            console.log(err);
            
            return false;
        }

    }

    async login(email, passwd) {
        const query = "SELECT * FROM users WHERE email=$1";
        const values = [email];

        const res = await this.dbclient.query(query, values);
        const user = res.rows[0]

        if (user) {
            const isPasswdCorrect = await bcrypt.compare(passwd, res.rows[0].password);

            if (isPasswdCorrect == true) {
                const token = jwt.sign({email: user.email, role: user.role }, process.env.TOKEN, {
                    expiresIn: '1h'
                });

                return token;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

}

export default UserController;