// const sessionIDtoMap = new Map();  //we were using this to create state for user
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function setUser(user){
    //we were using id as short id to identify user but we do not need it anymore
    // sessionIDtoMap.set(id, user);
    //creating payload with user data
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.SECRET_KEY) //creating token, 1st para is payload , 2nd is secretKey to encode, payload needs to be plain object
}

export function getUser(token){
    if(!token) return null
    return jwt.verify(token, process.env.SECRET_KEY) //here we are decoding the token
}