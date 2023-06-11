import type { NextApiRequest, NextApiResponse } from 'next';
import extendUse from '@/utils/extendedUse';
import axios from 'axios';

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const API_URL = process.env.API_URL;

function findData(data:any, email:string) {
    return data.email === email
  }

export default async function updateUserHandler(req: NextApiRequest, res : NextApiResponse) {
    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    try {
        const user = extendUse(tokenAuthSerial, TOKEN_SECRET) ;
        const {name,email,lastName,phone} = req.body;
        // console.log("DATA: ",name,email,lastName, phone), 
        // console.log("USER: ", user);
        if(!!user && !!name && !!email) { 
            // console.log("TODO BIEN");
            // console.log(user.id);

            // peticion para info del usuario
            const getUserInfo = await axios({
                url: `${API_URL}user/${user.id}`,
                method: 'get',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "Authorization" : `Bearer ${user.tokenKeystone}`,
                },
                
            }).then((res) => {
                const dataArr : Array<any> = res.data.data.directorio; // Seleccionar info del user.directorio
                const resultado = dataArr.find((data) => data.email === email ) // buscar si el email que se quiere registrar existe
                if(resultado) return 'Contacto existente' // Si el email ya esta registrado
                else return dataArr; //Sino retorna directorio original del user
            }).catch((error) => {console.error(error.response.data)})

            const finalData : void | Array<any> | string = getUserInfo;
            // console.log("FINAL DATA : ", finalData);
            if(!(finalData instanceof Array)) {
                return res.status(200).send('Contacto existente')
            }

            //Comprobado que el contacto no existe en DB y retornando el array de contactos de USER            
            // Agregando nuevo contacto al array
            const newDir = [...finalData]
            const newData = {
                            name,
                            email,
                            lastName,
                            phone
                        }                        
            newDir.push(newData)
            // console.log("NEW ARRAY: ", newDir)
            // Creando nuevo contacto con la info del nuevo directorio
            const createContacto = await axios({
                url: `${API_URL}contact/`,
                method: 'post',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "Authorization" : `Bearer ${user.tokenKeystone}`,
                },
                data: newData
            })                
            console.log(createContacto.data)
            console.log(createContacto.data._id)
            
            // return res.status(200).json(finalData);

        } else {
            console.log("INFO INCOMPLETA");
            return res.status(401).json("Información incompleta, verifica que exista la información mínima requerida")
        }
        
    } catch (err){
        // console.error("ERROR EN updateUser: ")
        return res.status(400).json("ERROR EN updateUser");
    }
}