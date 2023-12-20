import User from '../model/user.js'

 
const signupUser = async(req,res)=>{

    const newUser = new User(req.body)
    await newUser.save()

}

export default signupUser