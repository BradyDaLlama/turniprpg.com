'use client';
import React, { useEffect, useState } from 'react';
import Svg from '@/components/svg';
import Option from './option';

import { Avatar, Skeleton, Select, SelectItem } from "@heroui/react";

import getGuilds from '@/app/api/getGuilds';

type Guild = { id: string; name: string; icon: string; hasBot: boolean };

export default function ServerList() {
    const [selectedGuild, setSelectedGuild] = useState('');
    const [selectedGuildData, setSelectedGuildData] = useState<Guild | null>(null);
    const [guilds, setGuilds] = useState([] as Guild[]);
    const [options, setOptions] = useState([] as any[]);

    useEffect(() => {
        const fetchGuilds = async () => {
            const result = await getGuilds();
            setGuilds(result.filter((guild: any) => guild.permissions & 0x8 || guild.permissions & 0x20));
        };

        fetchGuilds();
    }, []);

    useEffect(() => {
        setSelectedGuild(window.location.pathname?.split('/')?.[2] || '');
    }, [window.location.pathname]);

    useEffect(() => {
        if (selectedGuild && guilds.length && !guilds?.find((guildData: Guild) => guildData.id === selectedGuild)) {
            setSelectedGuild('');
            window.history.replaceState(null, '', '/dashboard');
            alert('You do not have permission to manage this server.');
        } else if (selectedGuild) {
            const guildData = guilds.find((guildData: Guild) => guildData.id === selectedGuild) || null;
            setSelectedGuildData(guildData);
        }
    }, [selectedGuild, guilds]);

    function createServerCard(guildData: Guild) {
        const guildId = guildData.id;
        const serverName = guildData.name;
        const serverIcon = guildData.icon;

        let serverIconUrl = serverIcon && `https://cdn.discordapp.com/icons/${guildId}/${serverIcon}.png`;
        let inviteServerUrl = `https://discord.com/oauth2/authorize?client_id=882808942881816577&permissions=2147797056&scope=bot&disable_guild_select=true&guild_id=${guildId}`;

        const className = `server-card ${guildId === selectedGuild ? 'selected' : ''}`;

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
                <a key={guildData.id} href={inviteServerUrl} className={className}>
                    {content}
                </a>
            );
        } else {
            content = (
                <div
                    key={guildData.id}
                    className={className}
                    onClick={() => {
                        setSelectedGuild(guildData.id);
                        window.history.pushState(null, '', `/dashboard/${guildData.id}`);
                    }}
                >
                    {content}
                </div>
            );
        }

        return content;
    }

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

    const skeletonRows = Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="server-card skeleton">
            <Skeleton className="server-icon" />
            <Skeleton className="server-name">
                <span>Server Name</span>
            </Skeleton>
        </div>
    ));

    return (
        <>
            <div className="server-list">
                {selectedGuild && (
                    <div className="server-box">
                        <div className="server-bar">
                            {[
                                <div
                                    className="server-card"
                                    onClick={() => {
                                        setSelectedGuild('');
                                        window.history.pushState(null, '', '/dashboard');
                                    }}
                                >
                                    <Svg name="arrow" key="arrow" />
                                </div>,
                                ...serverCardsWithBot.sort((a, b) => (a.key === selectedGuild ? -1 : 1)),
                                <div className="bar-divider">...</div>,
                                ...serverCardsWithoutBot,
                            ]}
                        </div>
                        <p>There are no options for this server yet.</p>
                    </div>
                )}
                {!selectedGuild && (
                    <>
                        <h1 className="server-heading">Servers You Manage</h1>
                        <p className="server-description">
                            {!serverCardsWithBot?.length
                                ? 'You do not manage any servers that turnipRPG is in.'
                                : 'You have the permissions to manage turnipRPG in these servers.'}
                        </p>
                        <div className="server-container">{serverCardsWithBot.length ? serverCardsWithBot : skeletonRows}</div>
                        <p className="server-description">You have the permissions to add turnipRPG to these servers.</p>
                        <div className="server-container">
                            {serverCardsWithoutBot.length ? serverCardsWithoutBot : skeletonRows}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
