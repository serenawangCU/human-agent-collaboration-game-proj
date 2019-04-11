const decideNextPlayer = (player1, player2, lastPlayer) => {
    if (Math.floor(Math.random() * 2) == 0) {
        return player1;
    } else {
        return player2;
    }
}

exports.decideNextPlayer = decideNextPlayer;