

class ExerciceController {

    constructor(dbclient) {
        this.dbclient = dbclient;
    }

    async create(name, instruction, language) {
        const query = 'INSERT INTO exercises (name, instruction, language) VALUES($1, $2, $3);';
        const values = [name, instruction, language];
        
        const res = await this.dbclient.query(query, values);
        console.log(res);
        

    }

    async getById(id) {

        const query = 'SELECT * FROM exercises WHERE id=$1';
        const values = [id];

        const res = await this.dbclient.query(query, values);
        return res.rows[0]
    }

    async getAll() {

        const query = 'SELECT * FROM exercises';

        const res = await this.dbclient.query(query);

        return res.rows;

    }

}

export default ExerciceController;

// const res = await this.dbclient.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'");