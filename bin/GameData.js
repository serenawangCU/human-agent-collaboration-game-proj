/**
 * Class of all the collected data in a game
 */
class GameData {

    /**
     * Constructor of the object, would intialize all fields
     * @param player1: the socket id of the first player
     * @param player2: the socket id of the second player
     */

    constructor(player1, player2) {
        // The following fields are the data we want to collect
        this.indivScore = [0, 0];
        this.indivSteps = [0, 0]
        this.totalScore = 0;
        this.linesPerMin = [];
        this.steps = [];
        
        // The following fields are some helper variables
        this.curNumRotate = 0;
        this.curElimLines = 0;
        this.startTime = new Date();
        this.players = [player1, player2];
    }

    /**
     * Returnt the overall score
     */

    getTotalScore() {
        return this.totalScore;
    }

    /**
     * Update the number of rotation in the current step
     */

    updateRotate() {
        this.curNumRotate++;
    }

    /**
     * Update the score and all the related fields
     * @param player: the socket id of the current player
     * @param lines: the lines eliminated in the current step
     */

    updateScore(player, lines) {

        // Calculate the score based on the lines
        let score = lines * lines * 10;

        // Update all the fields if needed
        if (player === this.players[0]) {
            this.indivScore[0] += score;
            this.indivSteps[0]++;
        } else {
            this.indivScore[1] += score;
            this.indivSteps[1]++;
        }

        this.totalScore += score;

        // Calculate the lines eliminated in the latest minute
        let curTime = new Date();
        let passedMins = Math.ceil(((curTime - this.startTime) / 1000) / 60);
        if (passedMins === this.linesPerMin.length + 1) {
            this.curElimLines += lines;
        } else {
            this.linesPerMin.push(this.curElimLines);
            this.curElimLines = lines;
        }

        this.steps.push([player, score, this.curNumRotate]);
        this.curNumRotate = 0;
    }

    /**
     * Add the eliminated lines of last minute into the array
     */

    finishGame() {
        this.linesPerMin.push(this.curElimLines);
    }

    /**
     * Helper function to print all the collected data
     */

    printInfo() {
        console.log("----------Game Data----------");
        console.log("Player 1 has played " + this.indivSteps[0] + " times");
        console.log("Player 2 has played " + this.indivSteps[1] + " times");
        console.log("Total score is " + this.totalScore);
        console.log("Player 1's socre is " + this.indivScore[0]);
        console.log("Player 2's socre is " + this.indivScore[1]);
        console.log("Lines eliminated per minute are: " + this.linesPerMin);
        let curTime = new Date();
        let passedSecs = Math.round((curTime - this.startTime) / 1000);
        console.log("Total time is " + passedSecs + " s");
        console.log("Total steps are " + this.steps.length);
        console.log("All steps are: ");
        for (let i = 0; i < this.steps.length; i++) {
            console.log("   Player: " + this.steps[i][0]);
            console.log("   Score: " + this.steps[i][1]);
            console.log("   Number of Rotation: " + this.steps[i][2] + "\n");
        }
        console.log("-------------End-------------");
    }
}

module.exports = GameData;