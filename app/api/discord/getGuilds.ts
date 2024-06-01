import getUser from './getUser';
import DiscordOauth2 from 'discord-oauth2';

export default async function getGuilds() {
    const oauth = new DiscordOauth2({
        clientId: '882808942881816577',
        clientSecret: 'LIQK_T6VnIAlTg3tXbNTTHmVLgQmC5ip',
        redirectUri: 'http://localhost:3000/api/discord/login',
    });

    const user = getUser();

    if (!user) return false;

    const guilds = await oauth.getUserGuilds(user.access_token);

    return guilds;
}
