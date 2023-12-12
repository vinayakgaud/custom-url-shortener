import {connect} from 'mongoose';

export async function connectToDB(url){
    return connect(url)
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch(err=>{
        console.log(err)
    });
}
