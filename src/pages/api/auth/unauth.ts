// import type { NextApiRequest, NextApiResponse } from 'next';

export default async function unauthHandler(req:any, res:any) {
    return res.status(200).setHeader('Set-Cookie', 'tokenAuthSerial=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT').send('Bye-bye');
}