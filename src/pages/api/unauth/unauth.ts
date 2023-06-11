import axios from 'axios';

// const API_URL = 'https://cms.centroculturadigital.mx/admin/api';
const API_URL = process.env.API_URL || "";

export default async function unauthHandler(req:any, res:any) {
    const {tokenAuthSerial} = req.cookies;

    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    const mutationLogout = {
        "query": `mutation {
            unauthenticate: unauthenticateUsuario {
                success
            }
        }`,
    };
    

    try {
        const response = await axios({
            url: API_URL,
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            data: mutationLogout
        })
        // console.log(response.status)
        if(response.status === 200) {
            return res.status(200).json('Unauth succesfully');
        } else {
            return res.status(401).json({error: 'Invalid response from server<'})
        }
    } catch(error) {
        return res.status(401).json({error: 'Invalid token'})
    }
}