const mongoose = require('mongoose');
const Games = require('../models/games.js');

/**
 * Class of all the collected data in a game
 */
class GameData {

    /**
     * Constructor of the object, would intialize all fields
     * @param player1: the socket id of the first player
     * @param player2: the socket id of the second player
     * @param roomId: the socket room id of the game
     */

    constructor(player1, player2, roomId) {
        // The following fields are the data we want to collect
        this.indivScore = [0, 0];
        this.indivSteps = [0, 0]
        this.totalScore = 0;
        this.linesPerMin = [];
        this.steps = [];
        this.stepCounter = 0;
        
        // The following fields are some helper variables
        this.curNumRotate = 0;
        this.curElimLines = 0;
        this.startTime = new Date();
        this.players = [player1, player2];
        this.curDownCount = 0;

        Games.create({
            roomId: roomId
        })
        .then((game) => {
            console.log("Create a new game entry!")
            this.gameId = game._id;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
     * Return the overall score
     */

    getTotalScore() {
        return this.totalScore;
    }

    /**
     * Return the two players
     */

    getPlayers() {
        return this.players;
    }

    /**
     * Return the scores of the individuals
     */

    getIndivScores() {
        return this.indivScore;
    }

    /**
     * Update the number of rotation in the current step
     */

    updateRotate() {
        this.curNumRotate++;
    }

    /**
     * Increase the score by 1 as the player presses down
     */

    updateDownCount() {
        this.curDownCount++;
    }

    /**
     * Update the score and all the related fields
     * @param player: the socket id of the current player
     * @param lines: the lines eliminated in the current step
     */

    updateScore(player, lines) {

        // Calculate the score based on the lines and the count of pressing down
        // Player still gets 4 points without any eliminated lines
        let score = 4;
        if (lines > 0) {
            lines * lines * 10;
        }
        score += this.curDownCount;
        this.curDownCount = 0;

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
            //push eliminated lines per min to mongoDB
            Games.findByIdAndUpdate(this.gameId, {
                $push: {"linesPerMin" : this.curElimLines}
            }, {
                new: true
            })
            .then((game) => {
                console.log("Push a new lines per min to DB");
            })
            .catch((err) => {
                console.log(err);
            })
    
            this.linesPerMin.push(this.curElimLines);
            this.curElimLines = lines;
        }

        //push step info to mongoDB
        Games.findByIdAndUpdate(this.gameId, {
            $push: {"steps" : {playerId: player, score: score, numOfRotations: this.curNumRotate}}
        }, {
            new: true
        })
        .then((game) => {
            console.log("Push a new step to DB");
        })
        .catch((err) => {
            console.log(err);
        })

        //stepCounter count total number of steps played
        this.stepCounter++;

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

    /**
     * Reset the object and 
     */

    reset() {
        this.indivScore[0] = 0;
        this.indivScore[1] = 0;
        this.indivSteps[0] = 0;
        this.indivSteps[1] = 0;
        this.totalScore = 0;
        this.linesPerMin = [];
        this.steps = [];
        this.stepCounter = 0;

        this.curNumRotate = 0;
        this.curElimLines = 0;
        this.startTime = new Date();
        this.players = [player1, player2];
        this.curDownCount = 0;

        Games.create({
            roomId: roomId
        })
        .then((game) => {
            console.log("Create a new game entry!")
            this.gameId = game._id;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
     * Remove the recorded document from database
     */

    removeFromDB() {
        Games.findByIdAndDelete(this.gameId)
        .then((resp) => {
            console.log("The new game document deleted.");
        })
        .catch((err) => {console.log(err);});
    }

    /**
     * Upload logged data to MongoDB
     */

    uploadToDB() {
        //calculate the total time elapsed for this game
        let curTime = new Date();
        let passedSecs = Math.round((curTime - this.startTime) / 1000);

        //update the stored game document
        Games.findByIdAndUpdate(this.gameId, {
            $set: {
                    "player1" : {playerId: this.players[0], individualScore: this.indivScore[0], stepsPlayed: this.indivSteps[0]},
                    "player2" : {playerId: this.players[1], individualScore: this.indivScore[1], stepsPlayed: this.indivSteps[1]},
                    "totalScore" : this.totalScore,
                    "totalTime" : passedSecs,
                    "totalSteps" : this.stepCounter
            }
        }, {
            new: true
        })
        .exec()
        .then((game) => {
            console.log("Successfully upload data to MongoDB!");
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

module.exports = GameData;