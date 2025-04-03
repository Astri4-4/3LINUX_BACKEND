import pg from "pg";

class DatabaseController {

    constructor() {
        this.host = "127.0.0.1";
        this.db = "coursero";
        this.user = "postgres";
        this.passwd = "Rwqfsfasxc_974";
        this.client = new pg.Client({
            user: this.user,
            password: this.passwd,
            host: this.host,
            port: 5432,
            database: this.db
        });
    }

    async testConnection() {
        this.client.connect().then(() => {
            console.log("DB OK");
            return true;
        }).catch((err) => {
            console.log("DB FAILED");
            return false;
        })
    }

}

export default DatabaseController;