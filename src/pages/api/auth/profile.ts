import extendUse from "@/utils/extendedUse";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";


export default function profileHandler(req:any, res:any) {
    const { tokenAuthSerial} = req.cookies; 

    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    try {
        const user = extendUse(tokenAuthSerial, TOKEN_SECRET) ;
        // console.log("USUARIO en el PR: extendedJWT  OFILE: ", user);
        /*eslint-disable*/
        return res.json({
            email: user.email,
            username: user.username,
            id: user.id,
            tokenKeystone: user.tokenKeystone,

        })

    } catch (error) {
        return res.status(401).json({error: 'Invalid token'})
    }
}