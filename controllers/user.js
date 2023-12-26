import user from '../models/user.js'
import {v4 as uuidv4} from 'uuid';
import {setUser, getUser} from '../service/authUser.js'

export async function createUserHandler(req, res){
    const {name, email, password} = req.body
    await user.create({
        name,
        email,
        password
    })
    return res.status(201).render('home',{
        succesMsg: 'Successfully created the User'
    })
}

export async function loginUserHandler(req, res){
    const {email, password} = req.body
    const User = await user.findOne({
        email,
        password
    })
    if(!User){
        return res.render('login',{
            error: 'Please enter valid credentials'
        })
    }else{
        const sessionID = uuidv4();
        setUser(sessionID, User)
        res.cookie('uuid', sessionID)
        return res.redirect('/')
    }
}