const Shapes = require("./Shapes.js");

class Game {
    constructor(socketId1, socektId2, io) {
        
        // The two sockets of players
        this.socketId1 = socketId1;
        this.socektId2 = socektId2;
        this.io = io;

        // Height and width
        this.fieldHeight = 15;
        this.fieldWidth = 10;

        // Two block objects
        this.currentBlock = null;
        this.nextBlock = null;

        // Field matrix
        this.gameField = [];
        // Scores of two people
        this.score = [];
        // Total score of the game
        this.totalScore = 0;
        // The speed of the falling
        this.speed = 500;
        // The level of the game
        // Higher -> quicker
        this.level = 1;
        // The interval function to loop infinitely
        this.interval = null;

        this.initGame();
    }

    /**
     * Initialize the game
     */
    initGame() {

        // Generate the next block
        this.nextBlock = this.generateBlock();

        this.score[this.socketId1] = 0;
        this.score[this.socektId2] = 0;

        // Create an empty game pane
        for (let i = 0; i < this.fieldHeight; i++) {
            this.gameField[i] = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                this.gameField[i][j] = 0;
            }
        }

        // TODO: send the initial information
    }

    /**
     * Infinite loop of the game
     */
    loop() {
        // Start a interval and store the function
        this.interval = setInterval(() => {

            console.log(this.gameField);

            this.blockFallDown();
            this.eliminateRows();
          }, this.speed);
    }

    /**
     * Function to generate a block
     */
    generateBlock() {
        // Rondom a block
        let nextBlock = Shapes[Math.floor(Math.random() * Shapes.length)];
        // Do a deep copy
        let newBlock = {};
        newBlock.path = Array.from(nextBlock.path);
        newBlock.id = nextBlock.id;
        newBlock.type = nextBlock.type;

        return newBlock;
    }

    /**
     * Function to check if the game is over
     * @param block: the new generated block (would be on the top)
     */
    checkIfGameOver(block) {
        // Iterate over all cells to see if there're overlapping or reaching the bottom
        for (let i = 0; i < 4; i++) {
            if (this.gameField[block.path[i][0]][block.path[i][1]] === 1 || 
                this.gameField[block.path[i][0] + 1][block.path[i][1]] === 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * Function to check if the current block reaches the bottom
     * @param block: the current active block
     */
    checkIfReachBottom(block) {
        // Iterate all cells to see if they are at the bottom or there's an existing cell beneath
        for (let i = 0; i < 4; i++) {
            if (block.path[i][0] == this.fieldHeight - 1 || 
                this.gameField[block.path[i][0] + 1][block.path[i][1]] == 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * Add a block to the field when it reaches the bottom
     * @param block: the block that reaches the bottom
     */
    addBlockToField(block) {
        // Iterate over all cells
        for (let i = 0; i < 4; i++) {
            this.gameField[block.path[i][0]][block.path[i][1]] = 1;
        }
    }

    /**
     * Function to move the current block downwards by 1
     */
    blockFallDown() {
        // If the current block is empty
        // Generate a new block
        if (this.currentBlock === null) {
            this.currentBlock = this.nextBlock;
            this.nextBlock = this.generateBlock();

            // Check if the game is over because of the new block
            if (this.checkIfGameOver(this.currentBlock) === true) {
                this.finishGame();
            }
            return;
        }

        // Otherwise, iterate over the current block to move downwards
        for (let i = 0; i < 4; i++) {
            this.currentBlock.path[i][0] = this.currentBlock.path[i][0] + 1;
        }

        // Check if the current block reaches the bottom after moving down
        if (this.checkIfReachBottom(this.currentBlock) === true) {
            // Add the block to field if it reaches the bottom
            this.addBlockToField(this.currentBlock);
            // Reset the current block as we would need a new block ins the next turn
            this.currentBlock = null;

            // TODO: send some information to update blocks and players
        }
    }

    /**
     * Terminate the interval if the game finishes
     */
    finishGame() {
        clearInterval(this.interval);

        // TODO: send game is over to players
    }

    /**
     * Eliminate complete rows if possible
     */
    eliminateRows() {
        // Get all full rows
        let fullRows = []
        this.gameField.forEach((row, rowIndex) => {
            if (row.indexOf(0) === -1) {
                fullRows.push(rowIndex)
            }
        });

        // Remove all full rows
        if (fullRows.length) {
            let field = this.gameField;
            fullRows.forEach(row => {
                for (let i = row; i > 0; i--) {
                    for (let j = 0; j < this.fieldWidth; j++) {
                        if (field[i][j] !== 0 && field[i - 1][j] !== 0) {
                            field[i][j] = field[i - 1][j]
                        }
                    }
                }
            })

            // Update the score
            this.totalScore += fullRows.length * fullRows.length;

            // TODO: send information to update the score
        }
    }

    /**
     * Wrap the block and the field for sending to front-end
     */
    wrapBlockAndField() {

        // Do a deep copy
        let field = [];
        for (let i = 0; i < this.fieldHeight; i++) {
            field[i] = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                field[i][j] = this.gameField[i][j];
            }
        }

        // Add the block to the field
        if (this.currentBlock !== null) {
            for (let i = 0; i < 4; i++) {
                field[this.currentBlock.path[i][0]][this.currentBlock.path[i][1]] = 1;
            }
        }

        return field;
    }

    move(direction) {
        // TODO: implement
    }

    rotate() {
        // TODO:implement
    }
}

module.exports = Game;