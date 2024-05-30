'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function ServerList() {
    const { data: session, status } = useSession();
    let guilds = (session as any)?.user?.guilds || [];
    let serverCards = [];
    if (guilds) {
        for (let i = 0; i < guilds.length; i++) {
            let guildData = guilds[i];
            let guildId = guildData['id'];
            let buttonToAdd = <p className="invite button">Add to server</p>;

            let serverIconUrl = 'https://cdn.discordapp.com/icons/' + guildData['id'] + '/' + guildData['icon'] + '.png';
            let inviteServerUrl =
                'https://discord.com/oauth2/authorize?client_id=882808942881816577&permissions=2147797056&scope=bot&disable_guild_select=true&guild_id=' +
                guildData['id'];
            let serverName = guildData['name'];

            let abbreviatedName = '';

            if (guildData['icon']) {
                serverCards.push(
                    <a href={inviteServerUrl} target="_blank" className="servercard">
                        <img className="servericon" src={serverIconUrl} alt={serverName} />
                        <span className="servername">{serverName}</span>
                        {buttonToAdd}
                    </a>
                );
            } else {
                let words = serverName.split(' ');
                for (let i = 0; i < words.length; i++) {
                    let word = words[i];
                    abbreviatedName += word.substring(0, 1).toUpperCase();
                }
                serverCards.push(
                    <a href={inviteServerUrl} target="_blank" className="servercard">
                        <div className="servericon abbreviatedname">{abbreviatedName}</div>
                        <span className="servername">{serverName}</span>
                        {buttonToAdd}
                    </a>
                );
            }
        }
    }

    return (
        <>
            <div className="info">
                <h1 className="serverheading">Servers You Manage</h1>
                <p className="serverdescription">You have the permissions to add turnipRPG to any of these servers!</p>
                {serverCards}
            </div>
        </>
    );
}
