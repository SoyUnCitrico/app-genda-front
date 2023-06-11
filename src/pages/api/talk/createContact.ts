import type { NextApiRequest, NextApiResponse } from 'next';
import extendUse from '@/utils/extendedUse';
import axios from 'axios';

const TOKEN_SECRET = process.env.TOKEN_SECRET  || "";
const API_URL = process.env.API_URL  || "";


export default async function createContactHandler(req: NextApiRequest, res : NextApiResponse) {
    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    try {
        const user = extendUse(tokenAuthSerial, TOKEN_SECRET) ;
        const data = req.body;
        // console.log("INFODATA IN SERVER: ", data)
        const {name, lastName, email, phone} = data;
        // console.log("USERID IN SERVER: ", user.id)
        if(!!name && !!email) {
            console.log("Info minima CORRECTA")
            const bodyCreate = {
                name: name,
                lastName: lastName,
                email: email,
                phone: phone,
            }
            const response = await axios({
                url: `${API_URL}contact/`,
                method: 'post',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "vary": "Origin",
                    "Authorization" : `Bearer ${user.tokenKeystone}`,
                },
                data: bodyCreate
            }).then((res) => {
                // console.log("FINAL DATA: ", res.data._id);
                return res.data
            }).catch((error) => {console.error(error.response.data)})
            const finalData = response
            // console.log("FINAL DATA 2: ", finalData);
            return res.status(200).json(finalData);


        } else {
            console.log("INFO INCOMPLETA");
            return res.status(401).json("Información incompleta, verifica que exista la información mínima requerida")
        }
        
    } catch (err){
        // console.error("ERROR EN SAVEINFO: ")
        return res.status(400).json("ERROR en SAVEINFO");
    }
    
}