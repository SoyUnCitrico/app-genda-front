import extendUse from '@/utils/extendedUse';
import axios from 'axios';

const API_URL = process.env.API_URL || "";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

export default async function dashboardHandler (req: any, res:any) {

    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    
    try {
        const user = extendUse(tokenAuthSerial, TOKEN_SECRET) ;
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
            // console.log("-RES2-RES2-RES2", res.data)
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