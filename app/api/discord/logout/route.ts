import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const cookieResponse = NextResponse.redirect(new URL('/', req.url));
    cookieResponse.cookies.delete('user');
    return cookieResponse;
}
