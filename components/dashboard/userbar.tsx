'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

import { Avatar } from '@nextui-org/react';

import '@/styles/dashboard.css';

export default function UserBar() {
    const user = {
        username: 'test',
        avatar: '',
    };

    return (
        <span className="userbar">
            <Avatar
                className="avatar"
                src={user?.avatar || ''}
                name={user.username}
                size="lg"
                showFallback
                fallback={user.username[0]}
            />
            <h1 className="username">{user.username}</h1>
        </span>
    );
}
