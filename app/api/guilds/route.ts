import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import DiscordOauth2 from 'discord-oauth2';

import connect from '@/mongo/db';
import UserProfile from '@/mongo/models/UserProfile';

export async function GET(req: Request) {
    const oauth = new DiscordOauth2({
        clientId: process.env.DISCORD_BOT_ID,
        clientSecret: process.env.DISCORD_BOT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_API}/discord/`,
    });

    let params = new URL(req.url || '').searchParams;
    const urlParams = new URLSearchParams(params);
    const userID = urlParams.get('userID');
    if (!userID) {
        return NextResponse.json({ success: false });
    }

    await connect();
    const userProfile = await UserProfile.findOne({ userID: userID });

    const responseJSON = await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: process.env.DISCORD_BOT_ID!,
            client_secret: process.env.DISCORD_BOT_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: userProfile.refreshToken,
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const data = await responseJSON.json();

    userProfile.refreshToken = data.refresh_token;
    await userProfile.save();

    const guilds = await oauth.getUserGuilds(data.access_token);

    return NextResponse.json(guilds);
}
