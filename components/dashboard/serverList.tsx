'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@nextui-org/react';

import getGuilds from '@/app/api/getGuilds';

type Guild = { id: string; name: string; icon: string; hasBot: boolean };

export default function ServerList() {
    const [guilds, setGuilds] = useState([] as Guild[]);
    const router = useRouter();

    useEffect(() => {
        const fetchGuilds = async () => {
            const result = await getGuilds();
            setGuilds(result.filter((guild: any) => guild.permissions & 0x8 || guild.permissions & 0x20));
        };

        fetchGuilds();
    }, []);

    function createServerCard(guildData: Guild) {
        const guildId = guildData.id;
        const serverName = guildData.name;
        const serverIcon = guildData.icon;

        let serverIconUrl = serverIcon && `https://cdn.discordapp.com/icons/${guildId}/${serverIcon}.png`;
        let inviteServerUrl = `https://discord.com/oauth2/authorize?client_id=882808942881816577&permissions=2147797056&scope=bot&disable_guild_select=true&guild_id=${guildId}`;

        let content = (
            <>
                <Avatar
                    src={serverIconUrl || ''}
                    className="server-icon"
                    name={serverName
                        .split(' ')
                        .map((word: string) => word[0]?.toUpperCase())
                        .join('')}
                />
                <span className="server-name">{serverName}</span>
            </>
        );

        if (!guildData.hasBot) {
            content = (
                <a key={guildData.id} href={inviteServerUrl} className="server-card">
                    {content}
                </a>
            );
        } else {
            content = (
                <div key={guildData.id} className="server-card">
                    {content}
                </div>
            );
        }

        return content;
    }

    guilds?.sort((a: Guild, b: Guild) => (a.hasBot === b.hasBot ? 0 : a.hasBot ? -1 : 1));

    const { withBot, withoutBot } = guilds.reduce(
        (acc, guildData: Guild) => {
            if (guildData.hasBot) {
                acc.withBot.push(guildData);
            } else {
                acc.withoutBot.push(guildData);
            }
            return acc;
        },
        { withBot: [], withoutBot: [] } as { withBot: Guild[]; withoutBot: Guild[] }
    );

    const serverCardsWithBot = withBot.map(createServerCard);
    const serverCardsWithoutBot = withoutBot.map(createServerCard);

    return (
        <div className="server-list">
            <h1 className="server-heading">Servers You Manage</h1>
            <p className="server-description">
                {!serverCardsWithBot?.length
                    ? 'You do not manage any servers that turnipRPG is in.'
                    : 'You have the permissions to manage turnipRPG in these servers.'}
            </p>
            <div className="server-container">{serverCardsWithBot}</div>
            <p className="server-description">You have the permissions to add turnipRPG to these servers.</p>
            <div className="server-container">{serverCardsWithoutBot}</div>
        </div>
    );
}
