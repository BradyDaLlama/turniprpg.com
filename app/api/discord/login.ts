import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';
import DiscordOauth2 from 'discord-oauth2';
import jwt from 'jsonwebtoken';

export function GET(req: NextApiRequest, res: NextApiResponse) {
    const oauth = new DiscordOauth2({
        clientId: '882808942881816577',
        clientSecret: 'LIQK_T6VnIAlTg3tXbNTTHmVLgQmC5ip',
        redirectUri: 'http://localhost:3000/api/discord/login',
    });

    const url = oauth.generateAuthUrl({
        scope: ['identify', 'guilds'],
    });
    return redirect(url);
}
