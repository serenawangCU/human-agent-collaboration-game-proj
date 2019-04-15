const MongoClient = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema({
    playerId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    moves: [moveSchema]
},{
    timestamps: true
});

var Games = mongoose.model('Game', dishSchema);
module.exports = Games;