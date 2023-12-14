import mongoose from 'mongoose'


const Connection = async(USERNAME, PASSWORD) =>{
    
    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-jofhili-shard-00-00.dapxqag.mongodb.net:27017,ac-jofhili-shard-00-01.dapxqag.mongodb.net:27017,ac-jofhili-shard-00-02.dapxqag.mongodb.net:27017/?ssl=true&replicaSet=atlas-e3gin2-shard-0&authSource=admin&retryWrites=true&w=majority`
    // console.log(URL)
    try {
        await mongoose.connect(URL)
        console.log("Database connected successfully...")
    } catch (error) {
        console.log("Error while connecting to database - ", error)
    }
}


export default Connection
 
  