class FunctionController {

    constructor(dbclient) {
        this.dbclient = dbclient;
    }

    async create(exercise_id, name, args) {
        const query = "INSERT INTO exercise_function (exercise, name, args) VALUES ($1, $2, $3);";
        const values = [exercise_id, name, args];

        try {
            const result = await this.dbclient.query(query, values);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

        console.log(result);

    }

    async getByExerciseId(id) {
        const query = "SELECT * FROM exercise_function WHERE exercise=$1";
        const values = [id];

        try{
            const result = await this.dbclient.query(query, values);
            return result.rows;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async getById(id) {
        const query = "SELECT * FROM exercise_function WHERE id=$1";
        const values = [id];

        try{
            const result = await this.dbclient.query(query, values);
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

export default FunctionController;