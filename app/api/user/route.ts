import { NextResponse } from 'next/server';

import connect from '@/mongo/db';
import UserProfile from '@/mongo/models/UserProfile';

export async function GET(req: Request) {
    let params = new URL(req.url || '').searchParams;
    const urlParams = new URLSearchParams(params);
    const userID = urlParams.get('userID');
    if (!userID) {
        return NextResponse.json({ success: false });
    }

    await connect();
    const userProfile = await UserProfile.findOne({ userID: userID });

    return NextResponse.json(userProfile || { success: false });
}
