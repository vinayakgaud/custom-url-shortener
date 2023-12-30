import { getUser } from "../service/authUser.js";

export async function checkAuthentication(req, res, next){
    // const authorizationHeaderValue = req.headers['authorization']; //using headers to validate user
    const token = await req.cookies?.token
    req.user = null
    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) return next();
    // const token = authorizationHeaderValue.split('Bearer ')[1];
    if(!token) return next();
    const user = getUser(token)
    req.user = user
    next()
}

export function restrictTo(roles = []){
    //restricting based on roles
    return function(req, res, next){
        if(!req.user) return res.redirect('/login')
        console.log(req.user)
        if(!roles.includes(req.user.role)) return res.end('unauthorized')
        next();
    }
}

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