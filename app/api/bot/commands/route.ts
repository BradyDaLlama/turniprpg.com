import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { REST } from '@discordjs/rest';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

    const commands = await rest.get(`/applications/${'882808942881816577'}/commands`);

    return NextResponse.json(commands);
}
