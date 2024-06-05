'use client';
import React, { useEffect, useState } from 'react';

import { Avatar } from '@nextui-org/react';

import getGuilds from '@/app/api/getGuilds';

export default function ServerList() {
    const [unfilteredGuilds, setGuilds] = useState([] as { id: string; name: string; icon: string }[]);
    let guilds = null;

    useEffect(() => {
        const fetchGuilds = async () => {
            const result = await getGuilds();
            setGuilds(result);
        };

        fetchGuilds();
    }, []);

    if (unfilteredGuilds.length > 0) {
        guilds = unfilteredGuilds.filter((guild: any) => {
            return guild.permissions & 0x8 || guild.permissions & 0x20;
        });
    }

    let serverCards = [];
    for (let guildData of guilds || []) {
        const guildId = guildData.id;
        const serverName = guildData.name;
        const serverIcon = guildData.icon;

        let serverIconUrl = serverIcon && `https://cdn.discordapp.com/icons/${guildId}/${serverIcon}.png`;
        let inviteServerUrl = `https://discord.com/oauth2/authorize?client_id=882808942881816577&permissions=2147797056&scope=bot&disable_guild_select=true&guild_id=${guildId}`;

        serverCards.push(
            <a href={inviteServerUrl} target="_blank" className="server-card">
                <Avatar
                    src={serverIconUrl || ''}
                    className="server-icon"
                    name={serverName
                        .split(' ')
                        .map((word: string) => word[0]?.toUpperCase())
                        .join('')}
                />
                <span className="server-name">{serverName}</span>
                <p>Add to Server</p>
            </a>
        );
    }

    return (
        <div className="server-list">
            <h1 className="server-heading">Servers You Manage</h1>
            <p className="server-description">
                {guilds && guilds.length === 0
                    ? 'You do not manage any servers that turnipRPG is in.'
                    : 'You have the permissions to add turnipRPG to any of these servers!'}
            </p>
            <div className="server-container">{serverCards}</div>
        </div>
    );
}
