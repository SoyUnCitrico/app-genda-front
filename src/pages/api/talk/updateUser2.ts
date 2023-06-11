import type { NextApiRequest, NextApiResponse } from 'next';
import extendUse from '@/utils/extendedUse';
import axios from 'axios';

// const TOKEN_SECRET='secret';
// const API_URL = 'https://cms.centroculturadigital.mx/admin/api';
const TOKEN_SECRET = process.env.TOKEN_SECRET  || "";
const API_URL = process.env.API_URL  || "";

export default async function saveInfoHandler(req: NextApiRequest, res : NextApiResponse) {
    const { tokenAuthSerial} = req.cookies; 
    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }
    

    try {
        const user = extendUse(tokenAuthSerial, token) ;
        const data = req.body;
        // console.log("INFODATA IN SERVER: ", data)
        // console.log("USERID IN SERVER: ", user.id)
        if(!!data.contenido && !!data.titulo && !!data.introduccion) { 
            console.log("Info minima CORRECTA")
            const mutationCreate = {
                "query": `mutation CREATE_COLAB_ID($data: ColaboracionCreateInput){
                    createColaboracion(data: $data) {
                        id
                        slug
                    }
                }`,
                "variables" : {
                    "data": {
                        "usuarioCreador": {
                            "connect": {
                                "id": user.id,
                            }
                        },
                        "titulo": data.titulo,
                        "subtitulo": data.subtitulo ? data.subtitulo : "",
                        "slug": data.slug ? data.slug : "",
                        "tipoActividad": data.tipoActividad !== ""? data.tipoActividad : undefined,
                        "tipoActividadOtro": data?.tipoActividadOtro ? data?.tipoActividadOtro : "",
                        "modo": data.modo !== "" ? data.modo : undefined,
                        "personaOrganizadora": data.personaOrganizadora ? data.personaOrganizadora : "",
                        "personasObjetivo": data.personasObjetivo ? data.personasObjetivo : "",
                        "cupo": parseInt(data.cupo),
                        "tieneRegistro": data?.tieneRegistro ? data?.tieneRegistro : false,
                        "fechaInicioGlobal": data?.fechaInicioGlobal ? data?.fechaInicioGlobal : "",
                        "resumenSesiones": data?.resumenSesiones ? data?.resumenSesiones : "",
                        "copy": data?.copy ? data?.copy : "",
                        "introduccion": data.introduccion,
                        "contenido": data.contenido,
                        "semblanza": data?.semblanza ? data?.semblanza : "",
                        "contacto": data?.contacto ?  data.contacto : "",
                        "urlDriveImages": data?.urlDriveImages ?  data.urlDriveImages : "",
                        "urlDriveLogos": data?.urlDriveLogos ?  data.urlDriveLogos : "",
                        "comentarios": data?.comentarios ?  data.comentarios : "",
                        "requerimientosMobiliario": data?.requerimientosMobiliario ? data?.requerimientosMobiliario : false,
                        "requerimientosInternet": data?.requerimientosInternet ? data?.requerimientosInternet : false,
                        "requerimientosHardware": data?.requerimientosHardware ? data?.requerimientosHardware : false,
                        "requerimientosSoftware": data?.requerimientosSoftware ? data?.requerimientosSoftware : false,
                        "requerimientosPapeleria": data?.requerimientosPapeleria ? data?.requerimientosPapeleria : false,
                        "requerimientosOtro": data?.requerimientosOtro ? data?.requerimientosOtro : false,
                        "requerimientosOtroExtras": data?.requerimientosOtroExtras ? data?.requerimientosOtroExtras : "",
                        "notas": data?.notas ? data?.notas : "",
                        
                    }
            }};
            const response = await axios({
                url: API_URL,
                method: 'post',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "vary": "Origin",
                    "Authorization" : `Bearer ${user.tokenKeystone}`,
                },
                data: mutationCreate
            }).then((res) => {
                // console.log("FINAL DATA: ", res.data);
                return res.data.data
            }).catch((error) => {console.error(error.response.data)})
            const finalData = response.createColaboracion;
            // console.log("FINAL DATA 2: ", finalData);
            return res.status(200).json(finalData);
        } else {
            // console.log("INFO INCOMPLETA");
            return res.status(401).json("Información incompleta, verifica que exista la información mínima requerida")
        }
        
    } catch (err){
        // console.error("ERROR EN SAVEINFO: ")
        return res.status(400).json("ERROR en SAVEINFO");
    }
}