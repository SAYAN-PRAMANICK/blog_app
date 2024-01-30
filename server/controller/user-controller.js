import User from '../model/user.js'
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../model/token.js'

dotenv.config()
 
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
    const user = {username,password}
    //checking if the password matches
    const match = await bcrypt.compare(password, userData.password)

    //password doesn't matche
    if(!match){
        return res.status(500).json(`invalid password!`)
    }
    //password matches
    // to generate random secret keys -----> node -----> require('crypto').randomBytes(64).toString('hex')
    if(match){
        const accessToken = jwt.sign(userData.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn:'15m'})
        const refreshToken = jwt.sign(userData.toJSON(), process.env.REFRESH_SECRET_KEY)

        const newToken = new Token({token: refreshToken})
        await newToken.save()

        return res.status(200).json({accessToken,refreshToken, name:userData.fullname, username:userData.username})
    }
}
