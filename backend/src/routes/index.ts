import express from 'express'
import {userRouter} from './user'

export const mainRouter = express.Router()

mainRouter.get('/',(req,res)=>{
    res.json({msg:"hello From routes2"})
})

mainRouter.use('/user', userRouter)
