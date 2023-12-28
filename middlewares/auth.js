import { getUser } from "../service/authUser.js";

export async function restrictToLoggedInUserOnly(req, res, next){
    const userToken = await req.cookies?.uid; //that ? means if cookies have value then check for uuid
    if(!userToken){ return res.redirect('/login')}
    const user = getUser(userToken)
    if(!user) {return res.redirect('/login')}
    //else sending that user as request body to use it further
    req.user = user;
    next();
}

export async function checkAuth(req, res, next){
    const userToken = await req.cookies?.uid; //that ? means if cookies have value then check for uuid
    const user = getUser(userToken)
    req.user = user;
    next();
}