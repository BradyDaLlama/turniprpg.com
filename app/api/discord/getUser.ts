import { cookies } from 'next/headers';

interface User {
    id: string;
    avatar: string;
    username: string;
    global_username: string;
}

export default function getUser(): User | null {
    const user = cookies().get('user')?.value;
    if (user) return JSON.parse(user);
    fetch(`api/discord/`);
    return null;
}
