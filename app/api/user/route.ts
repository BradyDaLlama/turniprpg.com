import { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from 'next/server';

import connect from '@/mongo/db';
import UserProfile from '@/mongo/models/UserProfile';

export async function GET(req: NextRequest) {
    if (!req.cookies.get?.('user')?.value) {
        return NextResponse.json({ success: false });
    }

    const userID = JSON.parse(req.cookies.get('user')?.value || '').id;
    await connect();
    const userProfile = await UserProfile.findOne({ userID: userID });

    return NextResponse.json(userProfile || { success: false });
}
