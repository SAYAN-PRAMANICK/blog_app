import User from '../model/user.js'
import signupUser from '../controller/user-controller.js'

export const newUserValidator = async(req,res) => {
    
    const newUsername = req.body.username
    const userData = await User.exists({username:newUsername})

    if(newUsername===""){
        console.log(`empty username!`)
        res.status(500).json(`empty username!`)

    }else if(userData==null){
        console.log(`new userName detected`)
        signupUser(req,res)
        .then(()=>{
            res.send(`Sign up successful: \n\tfullname:${req.body.fullname}\n\tusername:${req.body.username} \n\tpassword:***`)
        })

    }else{
        //return error --> duplicate username
        console.log(`username '${newUsername}' already exists!`)
        res.status(500).json(`username '${newUsername}' already exists!`)
    }

}