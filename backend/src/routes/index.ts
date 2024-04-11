import express from 'express'
export const router = express.Router()
import { userRouter } from './user'


export const mainRouter = express.Router()

router.use('/user', userRouter)
