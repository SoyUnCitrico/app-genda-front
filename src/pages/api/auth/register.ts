
import axios from 'axios'

const TOKEN_SECRET = process.env.TOKEN_SECRET  || "";
const API_URL = process.env.API_URL  || "";

export default async function registerHandler(req:any, res:any) {

    const data = req.body
    const sendedData = {...data, directorio:[]}
    // console.log("DATOS", data)
    try {
        const fetching = await axios({
            url: `${API_URL}auth/register`,
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            data: sendedData
        })

        // console.log(fetching.data)

        if(fetching.status === 200) {

            const newUser = fetching.data
            console.log(newUser)
            if(newUser == 'Ya existe el usuario') {
                return res.status(500).json({newUser})
            } else {
                return res.status(200).json({newUser});
            }
  
        } else return res.status(400).json({data:"ERROR"})

    } catch (error) {
        return res.status(401).json({error: error})
    }
}