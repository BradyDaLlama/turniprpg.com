import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default function getUserFromToken(): false | { id: string; username: string; avatar: string; access_token: string } {
    const token = cookies().get('token')?.value;

    if (!token) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, 'secret') as { id: string; username: string; avatar: string; access_token: string };
        return {
            ...(decoded as {}),
            avatar: `https://cdn.discordapp.com/avatars/${decoded.id}/${decoded.avatar}.png?size=512`,
        } as {
            id: string;
            username: string;
            avatar: string;
            access_token: string;
        };
    } catch (error) {
        // Handle token verification error
        console.error('Error verifying token:', error);
        return false;
    }
}
