import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Connection from './database/db.js'
import Router from './routes/route.js'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true})) 
app.use('/api',Router)



dotenv.config()
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD


const port = 8000
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})


Connection(USERNAME, PASSWORD) 