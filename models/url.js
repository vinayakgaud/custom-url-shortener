import { Schema, model } from 'mongoose';

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
    ]
},{timestamps: true});

const URL = model('url', urlSchema);
export default URL;
