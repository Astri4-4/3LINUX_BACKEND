class FunctionController {

    constructor(dbclient) {
        this.dbclient = dbclient;
    }

    async create(exercise_id, name, instruction, args) {
        const query = "INSERT INTO exercise_function (exercise, name, instruction, args) VALUES ($1, $2, $3, $4);";
        const values = [exercise_id, name, instruction, args];

        const result = await this.dbclient.query(query, values);

        console.log(result);

    }

}

export default FunctionController;