import User from '../model/user.js'
import bcrypt from'bcrypt'

 
export const signupUser = async(req,res)=>{

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({fullname:req.body.fullname, username:req.body.username, password:hashedPassword})
    await newUser.save()
    .then(()=>{
        res.send(`Sign up successful: \n\tfullname:${req.body.fullname}\n\tusername:${req.body.username} \n\tpassword:***`)
    })

}

export const loginUser = async(req,res) =>{
    const {username,password,userData} = req
    
    const match = await bcrypt.compare(password, userData.password)
    if(!match){
        return res.status(500).json(`invalid password!`)
    }
}
