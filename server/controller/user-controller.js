import User from '../model/user.js'

 
const signupUser = async(req,res)=>{

    let {fullname, username, password} = req.body 
    
    try {
        const newUser = new User(req.body)
        await newUser.save()
        .then(()=>{
            res.send(`Sign up successful: \n\tfullname:${fullname}\n\tusername:${username} \n\tpassword:***`)
        })
        // .catch(error=>{
        //     // res.send({'type':error.name,'detail':error.message})
            
        // })
    } catch (error) {
        res.status(500).json({'type':error.name,'detail':error.message})
       }
}


// return response.status(200).json({msg: 'Signup Successfull'})
// return response.status(500).json({msg: 'Error while signing up',error})




export default signupUser