const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 2.5
    },
    ulcwinner: {
        type: Boolean,
        default: false,
    },
    location: {
        type: String,
        enum: ['England', 'Italy', 'France', 'Germany', 'Spain']
    },
}, {timestamps: true})


module.exports = mongoose.model("Teams", teamSchema)