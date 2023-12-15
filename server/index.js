import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Connection from './database/db.js'
import Router from './routes/route.js'

//app cursor
const app = express()


//Middlewares
app.use(cors())
app.use(express.json())
app.use('/',Router)


//Private Environment variables
dotenv.config()
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD


//Starting server
const port = 8000
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})

//DB connection initialisation
Connection(USERNAME, PASSWORD)  