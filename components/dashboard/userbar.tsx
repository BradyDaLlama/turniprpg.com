import React from 'react';

import { Avatar } from "@heroui/react";

import getUser from '@/app/api/discord/getUser';

export default function UserBar() {
    const user = getUser() || { id: '', username: '', avatar: '' };

    return (
        <span className="userbar">
            <Avatar
                className="avatar"
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`}
                name={user.username}
                size="lg"
                showFallback
                fallback={user.username[0]}
            />
            <h1 className="username">{user.username}</h1>
        </span>
    );
}
