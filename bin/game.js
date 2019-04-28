const Shape = require("./Shapes.js");
const Directions = require("./Directions.js");
const GameStatus = require("./GameStatus.js");
// const FileSystem = require('fs');
const decideNextPlayer = require("./Distributor.js");
const GameData = require("./GameData.js")

class Game {

    /**
     * Constructor
     * @param socketId1: the first player's id
     * @param socketId2: the second player's id
     * @param roomId: the room id of this game
     * @param io: the io id
     */

    constructor(socketId1, socketId2, roomId, io) {
        
        // The two sockets of players
        this.socketId1 = socketId1;
        this.socketId2 = socketId2;
        this.roomId = roomId;
        this.io = io;

        // Height and width
        this.fieldHeight = 15;
        this.fieldWidth = 10;

        // Two block objects
        this.currentBlock = null;
        this.nextBlock = null;

        // Two players
        // Distinguished by player's id
        this.currentPlayer = null;
        this.nextPlayer = null;

        // Field matrix
        this.gameField = [];

        this.initGame();
    }

    /**
     * Initialize the game
     */

    initGame() {

        // All the data related of this game
        this.gameData = new GameData(this.socketId1, this.socketId2, this.roomId);

        // The speed of the falling
        this.speed = 500;
        // The level of the game
        // Higher -> quicker
        this.level = 1;
        // The interval function to loop infinitely
        this.interval = null;

        // The game status
        this.gameStatus = GameStatus.PENDING;
        
        // Generate the next block and the next player
        this.nextBlock = this.generateBlock();
        this.nextPlayer = decideNextPlayer(this.socketId1, this.socketId2, null);

        // Create an empty game pane
        for (let i = 0; i < this.fieldHeight; i++) {
            this.gameField[i] = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                this.gameField[i][j] = 0;
            }
        }

        // Send the intial score
        this.io.in(this.roomId).emit('score', {
            score : this.gameData.getTotalScore()
        });
    }

    /**
     * Infinite loop of the game
     */

    loop() {
        // Start a interval and store the function
        this.gameStatus = GameStatus.PLAYING;
        this.interval = setInterval(() => {

            // console.log(this.gameField);

            this.blockFallDown();
          }, this.speed);
    }

    /**
     * Function to generate a block
     */

    generateBlock() {
        // Rondom a block
        let newBlock = Shape.generateRandomShape();
        return newBlock;
    }

   /**
    * Return a shape by index
    * @param index: index in constant shapes
    */

    generateBlockByIndex(index) {
        let newBlock = Shape.generateShapeByIndex(index);
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
        // If the current block and the current player are empty
        // Generate a new block and decide the next player
        if (this.currentBlock === null) {
            this.currentBlock = this.nextBlock;
            this.nextBlock = this.generateBlock();

            this.currentPlayer = this.nextPlayer;
            this.nextPlayer = decideNextPlayer(this.socketId1, this.socketId2, this.currentPlayer);

            // Send the data to the front-end
            this.io.in(this.roomId).emit('player_block_data', {
                nextBlockIndex : this.getShapeIndex(this.nextBlock),
                currentPlayer : this.currentPlayer,
                nextPlayer : this.nextPlayer
            });
            //console.log("current: " + this.currentPlayer + " next: " + this.nextPlayer)
            // Check if the game is over because of the new block
            if (this.checkIfGameOver(this.currentBlock) === true) {
                this.addBlockToField(this.currentBlock);
                this.finishGame();
            }

            return;
        }

        // Check if the current block reaches the bottom
        if (this.checkIfReachBottom(this.currentBlock) === true) {
            // Add the block to field if it reaches the bottom
            this.addBlockToField(this.currentBlock);
            this.eliminateRows();
            // Reset the current block as we would need a new block in the next turn
            this.currentBlock = null;
            return;
        }

        // Move down the block
        for (let i = 0; i < 4; i++) {
            this.currentBlock.path[i][0] = this.currentBlock.path[i][0] + 1;
        }
    }

    /**
     * Terminate the interval if the game finishes
     */

    finishGame() {
        clearInterval(this.interval);
        
        // change the game status
        this.gameStatus = GameStatus.OVER;
        // upate the game data
        this.gameData.finishGame();

        // Write out the records
        this.exportRecords();

        // Send game is over to players
        this.io.in(this.roomId).emit('game_over', {
            totalScore : this.gameData.getTotalScore(),
            players : this.gameData.getPlayers(),
            indivScore : this.gameData.getIndivScores(),
            totalScoreRanking: this.gameData.getTotalScoreRanking(),
            numberOfGamesInDB: this.gameData.getNumberOfGamesInDB()
        });
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
                        field[i][j] = field[i - 1][j];
                    }
                }

                for (let i = 0; i < this.fieldWidth; i++) {
                    field[0][i] = 0;
                }
            })
        }

        // Update the score
        this.gameData.updateScore(this.currentPlayer, fullRows.length);

        // Send information to update the score
        this.io.in(this.roomId).emit('score', {
            score : this.gameData.getTotalScore()
        });
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
                field[this.currentBlock.path[i][0]][this.currentBlock.path[i][1]] = 2;
            }
        }

        return field;
    }

    /**
     * Method to move the current shape by the given direction
     * @param direction: the direction of the move
     */

    move(direction) {
        if (this.currentBlock === null) {
            return;
        }
        let newBlock = null;

        switch(direction) {
            case Directions.UP:
                console.log('rotate');
                newBlock = this.rotate();
                break;

            case Directions.DOWN:
                console.log('down');
                newBlock = new Shape(this.currentBlock);
                for (let i = 0; i < 4; i++) {
                    newBlock.path[i][0]++;
                }
                break;

            case Directions.LEFT:
                console.log('left');
                newBlock = new Shape(this.currentBlock);
                for (let i = 0; i < 4; i++) {
                    newBlock.path[i][1]--;
                }
                break;

            case Directions.RIGHT:
                console.log('right');
                newBlock = new Shape(this.currentBlock);
                for (let i = 0; i < 4; i++) {
                    newBlock.path[i][1]++;
                }
                break;

            default:
                console.log("Invalid direction input");
        }

        // Check if the new block overlaps can be put in the field
        if (newBlock != null && this.ifMovable(newBlock) === true) {
            this.currentBlock = newBlock;

            // Update the counter of rotation
            if (direction === Directions.UP) {
                this.gameData.updateRotate();
            } else if (direction === Directions.DOWN) {
                // Update the counter of pressing down
                this.gameData.updateDownCount();
            }
        }
    }

    /**
     * Method to generate the rotated shape by the current shape
     * The way to do this is to get the rotated shape first from the const array
     * And then move the rotated shape to the current position
     */

    rotate() {
        let curBlockIndex = -1;
        let nextBlockIndex = -1;

        // Hard-coded switch based on the const array
        switch(this.currentBlock.type) {
            case 'line':
            curBlockIndex = this.currentBlock.id - 1;
            nextBlockIndex = this.currentBlock.id % 2;
            break;

            // Doesn't make sense to rotate a cube
            // Return directly
            case 'cube':
            return new Shape(this.currentBlock);

            case 'romb1':
            curBlockIndex = 2 + this.currentBlock.id;
            nextBlockIndex = 3 + this.currentBlock.id % 2;
            break;

            case 'romb2':
            curBlockIndex = 4 + this.currentBlock.id;
            nextBlockIndex = 5 + this.currentBlock.id % 2;
            break;

            case 'horse1':
            curBlockIndex = 6 + this.currentBlock.id;
            nextBlockIndex = 7 + this.currentBlock.id % 4;
            break;

            case 'horse2':
            curBlockIndex = 10 + this.currentBlock.id;
            nextBlockIndex = 11 + this.currentBlock.id % 4;
            break;

            case 'triangle':
            curBlockIndex = 14 + this.currentBlock.id;
            nextBlockIndex = 15 + this.currentBlock.id % 4;
            break;
        }

        if (nextBlockIndex === -1) {
            return;
        }

        let newBlock = this.generateBlockByIndex(nextBlockIndex);
        this.moveBlock(newBlock, this.calculatePathDiff(this.generateBlockByIndex(curBlockIndex).path, 
                                                        this.currentBlock.path));

        return newBlock;
    }

    /**
     * Find the index of the given shape in the const array
     * TODO: refactor this part
     * @param shape: the shape to calculate the index
     */

    getShapeIndex(shape) {
        switch(shape.type) {
            case 'line':
            return shape.id - 1;

            case 'cube':
            return shape.id + 1;

            case 'romb1':
            return 2 + shape.id;

            case 'romb2':
            return 4 + shape.id;

            case 'horse1':
            return 6 + shape.id;

            case 'horse2':
            return 10 + shape.id;

            case 'triangle':
            return 14 + shape.id;
        }

        return null;
    }

    /**
     * Method to caculate the distance between the two shapes
     * @param oriPath: the starting position of the shape
     * @param curPath: the current position of the shape
     */

    calculatePathDiff(oriPath, curPath) {
        let diffPath = [];

        for (let j = 0; j < 2; j++) {
            diffPath[j] = curPath[0][j] - oriPath[0][j];
        }

        return diffPath;
    }

    /**
     * Move the current shape by the distance given
     * @param oriBlock: the current shape
     * @param diffPath: the distance to move
     */

    moveBlock(oriBlock, diffPath) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                oriBlock.path[i][j] += diffPath[j];
            }
        }
    }

    /**
     * Check if the given block would exceed the boundary or overlap with the field
     * @param movedBlock: the block to be checked
     */

    ifMovable(movedBlock) {

        for (let i = 0; i < 4; i++) {
            if (movedBlock.path[i][0] < 0 || movedBlock.path[i][0] >= this.fieldHeight ||
                movedBlock.path[i][1] < 0 || movedBlock.path[i][1] >= this.fieldWidth ||
                this.gameField[movedBlock.path[i][0]][movedBlock.path[i][1]] === 1) {
                    return false;
                }
        }

        return true;
    }

    /**
     * Method to export the collected data
     * TODO: implement it when have a server
     */

    exportRecords() {
        // this.gameData.printInfo();
        this.gameData.uploadToDB();
    }
}

module.exports = Game;