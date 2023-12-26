import { getUser } from "../service/authUser.js";

export async function restrictToLoggedInUserOnly(req, res, next){
    const userID = await req.cookies?.uuid; //that ? means if cookies have value then check for uuid
    console.log(userID)
    if(!userID) return res.redirect('/loginPage')
    const user = getUser(userID)
    if(!user) return res.redirect('/loginPage')
    console.log('user is found')
    //else sending that user as request body to use it further
    req.user = user;
    next();
}