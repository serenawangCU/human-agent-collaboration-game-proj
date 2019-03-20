class Game {
    constructor(socketId1, socektId2) {
        this.bothConnected = true;
        this.gameField = [];
        this.score = {};
        this.socketId1 = socketId1;
        this.socektId2 = socektId2;
        this.fieldHeight = 15;
        this.fieldWidth = 10;
        this.initGame();
    }

    //init game field
    initGame() {
        this.score[this.socketId1] = 0;
        this.score[this.socektId2] = 0;
        for (let i = 0; i < this.fieldHeight; i++) {
            this.gameField[i] = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                this.gameField[i][j] = '';
            }
        }
    }

    //set boolean for both connected
    setBothConnected(bothConnected) {
        this.bothConnected = bothConnected;
    }

    //get game field
    gameField() {
        return this.gameField;
    }
}

module.exports = Game;