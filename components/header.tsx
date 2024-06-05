import Image from 'next/image';
import React from 'react';

import MenuToggle from './menuToggle';
import ThemeToggle from './themeToggle';
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
                            {[
                                {
                                    name: 'Commands',
                                    href: '/commands',
                                    className: 'first',
                                },
                                {
                                    name: 'Invite',
                                    href: '/invite',
                                    className: 'second',
                                },
                                {
                                    name: 'Support',
                                    href: '/support',
                                    className: 'third',
                                },
                                {
                                    name: 'Dashboard',
                                    href: '/dashboard',
                                    className: 'fourth',
                                },
                                {
                                    name: 'Premium',
                                    href: '/premium',
                                    className: 'sixth',
                                },
                            ].map((item) => (
                                <li key={item.name}>
                                    <a className={item.className} href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
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
