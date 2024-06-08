import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import DiscordOauth2 from 'discord-oauth2';
import UserProfile from '@/mongo/models/UserProfile';
import connect from '@/mongo/db';

export async function GET(req: Request) {
    const oauth = new DiscordOauth2({
        clientId: process.env.DISCORD_BOT_ID,
        clientSecret: process.env.DISCORD_BOT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_API}/discord/`,
    });

    let params = new URL(req.url || '').searchParams;
    const urlParams = new URLSearchParams(params);
    const code = urlParams.get('code');

    if (!code) {
        const url = oauth.generateAuthUrl({
            scope: ['identify', 'guilds'],
        });
        return NextResponse.redirect(url);
    }

    let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_BOT_ID!,
            client_secret: process.env.DISCORD_BOT_SECRET!,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: `${process.env.NEXT_PUBLIC_API}/discord/`,
            scope: 'identify guilds',
        }),
    };

    const responseJSON = await fetch('https://discord.com/api/oauth2/token', options);
    const data = await responseJSON.json();
    const user = await oauth.getUser(data.access_token);

    //post the refresh token to the api route for saving it to the user's profile
    const refreshToken = data.refresh_token;
    await connect();
    const userProfile = await UserProfile.findOne({ userID: user.id });
    if (userProfile) {
        userProfile.refreshToken = refreshToken;
        await userProfile.save();
    } else {
        await UserProfile.create({ userID: user.id, refreshToken });
    }

    const cookieResponse = NextResponse.redirect(new URL('/', req.url));

    // Set a cookie
    cookieResponse.cookies.set(
        'user',
        JSON.stringify({
            id: user.id,
            avatar: user.avatar,
            username: user.username,
            global_username: user.global_name,
        }),
        {
            path: '/',
            sameSite: 'none',
            secure: true,
            maxAge: 60 * 60 * 24 * 30,
        }
    );

    return cookieResponse;
}
