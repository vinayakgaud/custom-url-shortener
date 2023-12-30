import mongoose, { Schema, model } from 'mongoose';

const urlSchema = new Schema({
    shortID:{
        type: String,
        required: true
    },
    redirectURL:{
        type: String,
        required: true
    },
    visitedHistory: [
        {
            timestamp:{
                type: Number
            }
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, //to get id of the use
        ref: 'user' //referencing to user column
    }
},{timestamps: true});

const URL = model('url', urlSchema);
export default URL;
