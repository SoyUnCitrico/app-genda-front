import type { NextApiRequest, NextApiResponse } from 'next';
import extendUse from '@/utils/extendedUse';
import axios from 'axios';

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const API_URL = process.env.API_URL;


export default async function updateUserHandler(req: NextApiRequest, res : NextApiResponse) {
    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    try {
        const user = extendUse(tokenAuthSerial, TOKEN_SECRET) ;
        const datos = req.body;
        // console.log("DATA: ",name,email,lastName, phone), 
        console.log(req.body);
        console.log(user)
        if(!!user && !!datos.directorio) { 
            const editarUsuario = await axios({
                url: `${API_URL}user/${user.id}`,
                method: 'put',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "Authorization" : `Bearer ${user.tokenKeystone}`,
                },
                data: {directorio:datos.directorio}
            })                
            // console.log("USUARIO EDITADO: ",editarUsuario.data)
            return res.status(200).json(editarUsuario.data);

        } else {
            console.log("INFO INCOMPLETA");
            return res.status(401).json("Información incompleta, verifica que exista la información mínima requerida")
        }
        
    } catch (err){
        // console.error("ERROR EN updateUser: ")
        return res.status(400).json("ERROR EN updateUser");
    }
}