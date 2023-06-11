import jwt, {Secret} from 'jsonwebtoken';
import axios from 'axios'
import {serialize} from 'cookie'

const TOKEN_SECRET = process.env.TOKEN_SECRET  || "";
const API_URL = process.env.API_URL  || "";

export default async function loginHandler(req : any, res : any) {
    const datos = req.body;
    // const thisInfo = {
    //     user,
    //     password
    // }

    try {
        const fetching = await axios({
            url: `${API_URL}/auth/login`,
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            data: datos
        })
        
        if(fetching.status === 200) {
            console.log(fetching.data)
            if(fetching.data.token !== null) {
                const data = fetching.data;
                // const myToken :string = data.token ?? "";
                // const myId :string = data.authUser?._id ?? '';
                // const myName :string = data.authUser?.user?.name ?? '';
                // const myEmail :string = data.authUser?.user?.email ?? '';
                // console.log ("MY Data: ", data);
                // console.log ("MY ID: ", myId);
                // console.log("MY NAME: ", myName);
                // console.log("MY Email: ", myEmail);
                // console.log ("MY Token: ", myToken);
    
                
                // const token2 = jwt.sign({
                //     //// Tiempo a partir de AHORA * numero de segundos * numero de minutos * numero de horas en el dia * numero de dias
                //     // exp: Math.floor(Date.now()/1000) * 60 * 60 * 23 * 30,
                //     exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                //     email: myEmail,
                //     username: myName,
                //     id: myId,
                //     tokenKeystone: myToken, 
                // }, TOKEN_SECRET)
                
                // const serializedToken = serialize('tokenAuthSerial', token2, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV === 'production',
                //     maxAge: 1000 * 60 * 60 * 6,
                //     path: '/',
                //     sameSite: 'lax'
                // })
                
                // return res.status(200).setHeader('Set-Cookie', serializedToken).json(`Login Succesfuly ${myName} ${myEmail}`);
    
            } else {
                return res.status(401).json({error: 'Username or password incorrect'})
            }  
        }

        
    } catch(err) {
        console.error("ERROR en AXIoS:",err);
        return res.status(401).json({error: 'Error en axios'})
    }

}