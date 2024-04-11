import express from 'express'
const app = express()
import { userSchema } from '../zod'
import { UserModel } from '../db'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config();

export const userRouter = express.Router()

if (!process.env.Mongo_URL) {
    throw new Error("Cannot connect to database: URL not defined");
}

mongoose.connect(process.env.Mongo_URL).then(() => {
    console.log("Database Connected Successfully")
}
).catch((e) => {
    console.log("Error Connecting To Database", e)
})

app.post('/signup', async (req, res) => {
    try {
        const { UserName, firstName, lastName, password } = req.body
        userSchema.safeParse({ UserName, firstName, lastName, password })

        const existingUser = await UserModel.findOne({
            Username: req.body.UserName
        })
        if (existingUser) {
            res.json({ message: "Email already taken / Incorrect inputs" })
        }
        const user = await UserModel.create({
            UserName, firstName, lastName, password
        })
        const userId = user._id;
        if (!process.env.JWT_Secret) {
            throw new Error("JWT secret is not defined in the environment variables");
        }
        const token = jwt.sign(userId, process.env.JWT_Secret)
        res.json({ message: "User Created Successfully", token: token })
    }
    catch (e) {
        console.error("Error in Signup")
        throw (e)
    }
})