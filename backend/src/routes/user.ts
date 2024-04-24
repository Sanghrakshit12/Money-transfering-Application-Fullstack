import express from 'express'
import { signupuserSchema, signinuserSchema, updateBody } from '../zod'
import { UserModel } from '../db'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import AuthMiddleware from '../middleware'
import { AuthenticatedRequest } from '../middleware'

export const userRouter = express.Router()
userRouter.use(express.json())

const JWT_Secret = "MoneyTransferX-2024"
const Mongo_URL = "mongodb+srv://gautamsanghrakshit:9pgqhb0ZCuGDFGnG@cluster0.epbc3ke.mongodb.net/MoneyTranferX"

if (!Mongo_URL) {
    throw new Error("Cannot connect to database: URL not defined");
}

mongoose.connect(Mongo_URL).then(() => {
    console.log("Database Connected Successfully")
}
).catch((e) => {
    console.log("Error Connecting To Database", e)
})

userRouter.get('/test', (req, res) => {
    res.json({ msg: "hello From User" })
})

userRouter.post('/signup', async (req, res) => {
    try {
        const userName = req.body.userName
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const password = req.body.password

        const check = await signupuserSchema.safeParse({ userName, firstName, lastName, password })
        if (!check.success)
            res.status(404).json({ error: check.error.errors })

        const existingUser = await UserModel.findOne({
            userName: req.body.userName
        })
        if (existingUser) {
            res.json({ message: "Email already taken / Incorrect inputs" })
        }
        const user = await UserModel.create({
            userName, firstName, lastName, password
        })
        const userId = user._id;

        const token = await jwt.sign({ userId }, JWT_Secret)
        res.json({ message: "User Created Successfully", token: token })
        console.log(`SignUp Successful ${firstName}`)
    }
    catch (e) {
        console.error("Error in Signup")
        throw (e)
    }
})

userRouter.post('/signin', async (req, res) => {
    try {
        const { userName, password } = req.body
        const check = signinuserSchema.safeParse({ userName, password })

        if (!check.success)
            res.status(404).json({ error: check.error.errors })

        const existingUser = await UserModel.findOne({ userName, password })
        if (!existingUser) {
            res.status(404).json({ message: "No User With Given Credentials Found" })
            return
        }
        const userId = existingUser._id
        const token = jwt.sign({ userId }, JWT_Secret)
        res.status(200).json({ token: token })
        console.log(`SignIn Successful ${existingUser.firstName}`)
    }
    catch (e) {
        console.error("Error in Signin")
        throw (e)
    }
})

userRouter.put('/update', AuthMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
        const { password, firstName, lastName } = req.body
        const check = updateBody.safeParse({ password, firstName, lastName })
        if (!check.success)
            res.status(404).json({ error: check.error.errors })
        await UserModel.updateOne({ _id: req.userId }, req.body)
        res.status(200).json({ message: "Update Successful" })
        console.log("Update Successful")
    }
    catch (err) {
        res.status(404).json({ message: "Update Failed" })
        return
    }
})

userRouter.get('/bulk', async (req, res) => {

})

