const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);