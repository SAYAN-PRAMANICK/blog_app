import User from '../model/user.js'
import signupUser from '../controller/user-controller.js'

export const newUserValidator = async(req,res) => {
    
    const newUsername = req.body.username
    const userData = await User.exists({username:newUsername})

    //half-ass validation (only username)
    if(newUsername===""){
        res.status(500).json(`empty username!`)
    }else if(userData==null){
        signupUser(req,res)
    }else{
        //return error --> duplicate username
        res.status(500).json(`username '${newUsername}' already exists!`)
    }

}