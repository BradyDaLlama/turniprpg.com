import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DiscordOauth2 from 'discord-oauth2';
import jwt from 'jsonwebtoken';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const oauth = new DiscordOauth2({
        clientId: '882808942881816577',
        clientSecret: 'LIQK_T6VnIAlTg3tXbNTTHmVLgQmC5ip',
        redirectUri: 'http://localhost:3000/api/discord/login',
    });

    let params = new URL(req.url || '').searchParams;
    const urlParams = new URLSearchParams(params);
    const code = urlParams.get('code');

    if (!code) {
        const url = oauth.generateAuthUrl({
            scope: ['identify', 'guilds'],
        });
        return redirect(url);
    }

    let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: '882808942881816577',
            client_secret: 'LIQK_T6VnIAlTg3tXbNTTHmVLgQmC5ip',
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3000/api/discord/login',
            scope: 'identify email',
        }),
    };

    const responseJSON = await fetch('https://discord.com/api/oauth2/token', options);
    const data = await responseJSON.json();
    const user = await oauth.getUser(data.access_token);

    const jwtPayload = {
        id: user.id,
        username: user.username,
        avatar: user.avatar || '',
        access_token: data.access_token,
    };

    const secret = 'secret';
    const token = jwt.sign(jwtPayload, secret, { expiresIn: '30d' });

    const response = NextResponse.redirect('/new-page');
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
    });
    return response;
}
