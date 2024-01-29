import User from '../model/user.js'
import {signupUser, loginUser} from '../controller/user-controller.js'

export const newUserValidator = async(req,res) => {
    
    const newUsername = req.body.username
    const userData = await User.exists({username:newUsername})

    //half-ass validation (only username)
    if(newUsername===""){
        res.status(500).json(`empty username!`)
    }else if(userData==null){
        //if everything is alright!
        signupUser(req,res)
    }else{
        //return error --> duplicate username
        res.status(500).json(`username '${newUsername}' already exists!`)
    }

}
 
export const loginValidator = async(req,res) =>{

    const {username,password} = req.body

    let userData = await User.findOne({username: username})
    //if username doesn't exist
    if(!userData){
        return res.status(500).json(`username '${username}' doesn't exists!`)
    }
    //if username exists
    loginUser({username,password,userData},res)
    
}