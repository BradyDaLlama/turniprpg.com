import React from 'react';

import { Avatar } from '@nextui-org/react';

import getUser from '@/app/api/discord/getUser';

export default function UserBar() {
    const user = getUser() || { id: '', username: '', avatar: '' };

    return (
        <span className="userbar">
            <Avatar
                className="avatar"
                src={user.avatar}
                name={user.username}
                size="lg"
                showFallback
                fallback={user.username[0]}
            />
            <h1 className="username">{user.username}</h1>
        </span>
    );
}
