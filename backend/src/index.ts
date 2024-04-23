import express from 'express'
import { mainRouter } from './routes'
const app = express()
import cors from 'cors'

app.use('/api/v1', mainRouter)
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({msg:"hello From Main"})
})

app.listen(3000,()=>{
    console.log("Server Running on Port 3000")
})