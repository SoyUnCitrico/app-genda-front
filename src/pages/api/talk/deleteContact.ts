import type { NextApiRequest, NextApiResponse } from 'next';
import extendUse from '@/utils/extendedUse';
import axios from 'axios';

const TOKEN_SECRET = process.env.TOKEN_SECRET  || "";
const API_URL = process.env.API_URL  || "";


export default async function deleteContactHandler(req: NextApiRequest, res : NextApiResponse) {
    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    try {
        const user = extendUse(tokenAuthSerial, TOKEN_SECRET) ;
        const {id} = req.body;
        console.log("INFODATA IN SERVER: ", id)
        // const {name, lastName, email, phone} = data;
        // console.log("USERID IN SERVER: ", user.id)
        if(!!id) {
            // console.log("Info minima CORRECTA")

            const response = await axios({
                url: `${API_URL}contact/${id}`,
                method: 'delete',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "vary": "Origin",
                    "Authorization" : `Bearer ${user.tokenKeystone}`,
                },
            }).then((res) => {
                // console.log("FINAL DATA: ", res.data);
                return res.data
            }).catch((error) => {console.error(error.response.data)})
            const finalData = response
            // console.log("FINAL DATA 2: ", finalData);
            return res.status(200).json(finalData);


        } 
        
    } catch (err){
        return res.status(400).json("ERROR en deleteContact");
    }
    
}