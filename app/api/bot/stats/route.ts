import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { REST } from '@discordjs/rest';

export async function GET(req: Request, res: NextApiResponse) {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

    const stats = await rest.get(`/applications/${'882808942881816577'}`);

    return NextResponse.json(stats);
}
