// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const TOKEN_SECRET=process.env.TOKEN_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    
    const jwt = request.cookies.get('tokenAuthSerial')

    // if(request.nextUrl.pathname.includes('/dashboard')) {
    // Si no tiene un certificado JWTs    
    console.log('jwt', jwt);
    
    if(jwt === undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode(TOKEN_SECRET));
        // console.log(payload)
        // console.log("Usuario activo: ",payload.username)
        return NextResponse.next();
    } catch(err) {
        console.error(err);
        return NextResponse.redirect(new URL('/login', request.url))

    }
}


export const config = {
    matcher: ['/', '/dashboard', '/api/auth/:path*']
} 