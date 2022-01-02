import mongoose from "mongoose";

const {Schema} = mongoose
const userSchema = new Schema({
    name: {type: String, required: true},
    numTel: {type: Number},
    img: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true})

const User = mongoose.model('user', userSchema)
export default User
