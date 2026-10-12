import Image from 'next/image';
import React from 'react';

import MenuToggle from './menuToggle';
import ThemeToggle from './themeToggle';
import ContentDropdown from './contentDropdown';
import HeaderDropdown from './headerDropdown';

import getUser from '@/app/api/discord/getUser';

export default function Header() {
    const user = getUser();

    let pfp = (
        <Image
            className={`pfp${!user ? ' discordpfp' : ''}`}
            src={
                user?.avatar
                    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
                    : '/images/icons/discord.png'
            }
            width={512}
            height={512}
            alt={user?.avatar ? user.username : 'Discord Logo'}
        />
    );
    return (
        <>
            <header>
                <nav className="navbar">
                    <a href="/" id="logo">
                        <Image src="/images/icons/turnipLogo.png" alt="TurnipRPG Logo" width={1280} height={1280} />
                        turnipRPG
                    </a>

                    <span>
                        <div className="toggle-items">
                            <ThemeToggle />
                            <MenuToggle />
                        </div>
                        <ul className="navbar-links menu-hide">
                            <li>
                                <a href="/invite">Invite</a>
                            </li>
                            <li>
                                <a href="/support">Support</a>
                            </li>
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                            <li>
                                <a href="/premium">Premium</a>
                            </li>
                            <li>
                                <div className="login-items">
                                    <span>
                                        {(!user && (
                                            <a className="discord-login" href={`/api/discord`}>
                                                Log in
                                            </a>
                                        )) || <HeaderDropdown pfp={pfp} />}
                                    </span>
                                    {!user && pfp}
                                </div>
                            </li>
                        </ul>
                    </span>
                </nav>
            </header>
        </>
    );
}
