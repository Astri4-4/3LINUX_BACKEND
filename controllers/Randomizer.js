

class Randomizer {

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max -min)) + min;
    }

    getRndString() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const length = this.getRndInteger(0, 25);
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

}

export default Randomizer; 