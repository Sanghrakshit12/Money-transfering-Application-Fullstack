import express from 'express'
import { userRouter } from './user'
import { accountRouter } from './account'

export const mainRouter = express.Router()

mainRouter.get('/', (req, res) => {
    res.json({ msg: "hello From MainRouter" })
})

mainRouter.use('/user', userRouter)
mainRouter.use('/accounts', accountRouter)
