import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 3
    },
    firstName: {
        type: String,
        required: true,
        min: 3
    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
})
export const UserModel = mongoose.model('User', UserSchema)

