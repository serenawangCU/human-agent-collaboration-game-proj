const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema for each played step
 */
const stepSchema = new Schema({
    playerId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    numOfRotations: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

/**
 * Schema for each player's info
 */
const playerSchema = new Schema({
    playerId: {
        type: String,
        required: true
    },
    individualScore: {
        type: Number,
        default: 0,
        required: true
    },
    stepsPlayed: {
        type: Number,
        default: 0,
        required: true
    },
    playAgain: {
        type: Boolean,
        default: false
    },
    playWithSameAgain: {
        type: Boolean,
        default: false
    },
    survey: {
        type: Array,
        'default': []
    }
})

/**
 * Schema for each game played
 */
const gameSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    player1: playerSchema,
    player2: playerSchema,
    totalScore: {
        type: Number,
        default: 0,
        required: true
    },
    totalTime: {
        type: Number,
        default: 0,
        required: true
    },
    totalSteps: {
        type: Number,
        default: 0,
        required: true
    },
    linesPerMin: [{
        type: Number,
        default: 0,
        required: true
    }],
    steps: [stepSchema]
},{
    timestamps: true
});

var Games = mongoose.model('Game', gameSchema);
module.exports = Games;