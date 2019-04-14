/**
 * A template of a distributor algorithm
 * @param player1: the first player's id
 * @param player2: the second player's id
 * @param gameRecords: the existing records of the game
 */

const decideNextPlayer = (player1, player2, gameData) => {
    if (Math.floor(Math.random() * 2) == 0) {
        return player1;
    } else {
        return player2;
    }
}

module.exports = decideNextPlayer;