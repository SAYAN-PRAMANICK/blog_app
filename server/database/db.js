import mongoose from 'mongoose'


const Connection = async(USERNAME, PASSWORD) =>{
    
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@blog-cluster.d5rltvu.mongodb.net/?retryWrites=true&w=majority`
    
    try {
        await mongoose.connect(URL)
        console.log("Database connected successfully...")
    } catch (error) {
        console.log("Error while connecting to database - ", error)
    }
}


export default Connection
 