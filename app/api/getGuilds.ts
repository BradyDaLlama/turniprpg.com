'use server';
import { cookies } from 'next/headers';

interface User {
    id: string;
    avatar: string;
    username: string;
    global_username: string;
}

export default async function getUser() {
    const user = JSON.parse(cookies().get('user')?.value || '{}');
    if (user) {
        let guildsJson = await fetch(`${process.env.NEXT_PUBLIC_API}/guilds/?userID=${user.id}`);

        const guilds = await guildsJson.json();
        return guilds;
    }
    return null;
}
