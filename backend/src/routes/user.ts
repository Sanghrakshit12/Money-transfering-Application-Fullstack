import express from 'express'
import { signupuserSchema, signinuserSchema, updateBody } from '../zod'
import { AccountModel, UserModel } from '../db'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import AuthMiddleware from '../middleware'
import { AuthenticatedRequest } from '../middleware'
import dotenv from 'dotenv'

dotenv.config()

export const userRouter = express.Router()
userRouter.use(express.json())

const Mongo_URL = process.env.Mongo_URL
const JWT_Secret = process.env.JWT_Secret

if (!Mongo_URL) {
    throw new Error("Cannot connect to database: URL not defined");
}
if (!JWT_Secret) {
    throw new Error("JWT_Secret Not Set in env file");
}
mongoose.connect(Mongo_URL).then(() => {
    console.log("Database Connected Successfully")
}
).catch((e) => {
    console.log("Error Connecting To Database", e)
})

userRouter.get('/', (req, res) => {
    res.json({ msg: "hello From UserRouter" })
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
        const balance = Math.floor(1 + Math.random() * 10000)
        await AccountModel.create({
            userId,
            balance
        })
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

interface QueryedUser {
    userName: string;
    firstName: string;
    lastName: string;
    _id: mongoose.Types.ObjectId;
}

userRouter.get('/bulk', AuthMiddleware, async (req, res) => {
    const filter: string = req.query.filter?.toString() || "";
    const users = await UserModel.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    }).exec();

    const queriedUser: QueryedUser[] = users.map(user => ({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }));
    res.status(200).json({
        user: queriedUser
    })
    console.log(queriedUser)
})

