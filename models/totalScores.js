const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalScoreSchema = new Schema ({
    totalScore: {
        type: Number,
        required: true,
        default: 0,
        index: true
    }
});

var TotalScores = mongoose.model('TotalScore', totalScoreSchema);
module.exports = TotalScores;