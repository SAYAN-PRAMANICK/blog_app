import User from '../model/user.js'

const signupUser = async(request,response) =>{
    try {
        const user = request.body
        console.log(request.body)        
        const newUser = new User(user)
        await newUser.save()

        return response.status(200).json({msg: 'Signup Successfull'})
    } 
    catch (error) {
        return response.status(500).json({msg: 'Error while signing up',error})
        
    }
}

export default signupUser