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

const BankSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
export const UserModel = mongoose.model('User', UserSchema)
export const AccountModel = mongoose.model('Account', BankSchema)


