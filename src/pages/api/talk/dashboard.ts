import {verify} from 'jsonwebtoken';
import axios from 'axios';
import { extendedJWT } from '@/utils/types';

const API_URL = process.env.API_URL || "";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

export default async function dashboardHandler (req: any, res:any) {

    const extendUse = (verifiedToken : any): extendedJWT => {
        const original = verify(verifiedToken, TOKEN_SECRET);
        if(typeof original === 'object') {
            return { 
                ...original,
                email: original.email ? original.email : '',
                username: original.name ? original.name : '',
                id: original.id ? original.id : '',
                tokenKeystone: original.tokenKeystone ? original.tokenKeystone : '',
            }
        
            
        } else {
            return {
                key: original,
                email: '',
                username: '',
                id: '',
                tokenKeystone: '',
            }
        }
    }
    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

                // console.log(serializedToken);

    
    try {
        const user = extendUse(tokenAuthSerial) ;
        // console.log(`${API_URL}user/${user.id}`),
        // console.log("USER USER USER: ", user)
        const headers = {
            "content-type": "application/json; charset=utf-8",
            "vary": "Origin",
            "Authorization" : `Bearer ${user.tokenKeystone}`,
        };
        const newFetch = await axios({ 
            url: `${API_URL}user/${user.id}`,
            method: 'get',
            headers: headers,
    
        }).then((res) => {
            return res.data
        })
        const data = newFetch;
        // console.log("DATA: ", data);
        return res.status(200).json(data);
    } catch (err){
        console.error(err)
        return res.status(400).json("ERROR");
    }
}