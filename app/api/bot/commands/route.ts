import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { REST } from '@discordjs/rest';

export async function GET(req: Request) {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

    const commands = await rest.get(`/applications/${process.env.DISCORD_BOT_ID}/commands`);

    return NextResponse.json(commands);
}
