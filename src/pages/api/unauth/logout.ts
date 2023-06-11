import {verify} from 'jsonwebtoken';
import cookie from 'cookie';

// const TOKEN_SECRET='secret';
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";


export default async function logoutHandler(req:any, res:any) {
    const {tokenAuthSerial} = req.cookies;

    if(!tokenAuthSerial) {
        return res.status(401).json({error: 'No token'})
    }

    try {
        verify(tokenAuthSerial, TOKEN_SECRET);
        const serializedToken = cookie.serialize('tokenAuthSerial', "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        })
        res.setHeader('Set-Cookie', serializedToken);
        return res.status(200).json('Logout succesfully');
    } catch(error) {
        return res.status(401).json({error: 'Invalid token'})
    }
}