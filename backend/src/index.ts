import express from 'express'
import { mainRouter } from './routes'
const app = express()
import cors from 'cors'

app.use('/api/v1', mainRouter)
app.use(cors())
app.use(express.json())

app.listen(300)