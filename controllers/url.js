//we will be using nano id npm package to create short id/ url

import { nanoid } from 'nanoid';

//importing model
import url from '../models/url.js';

//function to generate short url
export async function generateShortURLHandler(req, res){
    const body = req.body;
    if( body === undefined){
        return res.status(400).json({error: 'Body is empty'})
    }else if(!body.url){
        return res.status(400).json({error: 'URL is not provided'})
    } 
    const shortID = nanoid(8)
    await url.create({
        shortID: shortID,
        redirectURL: body.url,
        visitedHistory: []
    });
    return res.status(201).render('home',{
        msg: `http://localhost:3000/url/${shortID}`
    })
    // return res.status(201).json({msg: `short url is generated successfully: http://localhost:3000/url/${shortID}`})
}

export async function getURLByShortIDHandler(req, res){
    ///:shortID
    const shortID = req.params.shortID;
    const entry = await url.findOneAndUpdate({shortID},{
        $push:{
            visitedHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL)
}  

export async function getURLVisitedAnalytics(req, res){
    const shortID = req.params.shortID;
    const result = await url.findOne({ shortID })
    res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    });
}