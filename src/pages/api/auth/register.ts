import jwt, {Secret} from 'jsonwebtoken';
import axios from 'axios'
import {serialize} from 'cookie'

const TOKEN_SECRET = process.env.TOKEN_SECRET  || "";
const API_URL = process.env.API_URL  || "";

export default async function registerHandler(req:any, res:any) {

    const data = req.body
    const sendedData = {...data, directorio:[]}
    
    try {
        const fetching = await axios({
            url: `${API_URL}auth/register`,
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            data: sendedData
        })

        if(fetching.status === 200) {

            const newUser = fetching.data
            console.log(newUser)
            if(newUser === 'Ya existe el usuario') {
                return res.status(500).json(newUser)
            } else {
                return res.status(200).json(newUser);
            }
  
        }

    } catch (error) {
        return res.status(401).json({error: error})
    }
}