import Image from 'next/image';
import React from 'react';

import MenuToggle from './menuToggle';
import ThemeToggle from './themeToggle';
import { Avatar } from '@nextui-org/react';

import getUser from '@/app/api/discord/getUser';

export default function Header() {
    const user = getUser();

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
                                    href: `${user ? '/dashboard' : '/'}`,
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
                                            <>
                                                <a className="glow-button discord-login" href={'/'}>
                                                    Log in
                                                </a>
                                            </>
                                        )) || (
                                            <>
                                                <a className="glow-button discord-login" href={`/`}>
                                                    Log out
                                                </a>
                                            </>
                                        )}
                                    </span>
                                    <Avatar
                                        src={user ? user.avatar : '/images/icons/discord.png'}
                                        className={`pfp${user ? '' : ' discordpfp'}`}
                                        name={user ? user.username : ''}
                                    />
                                </div>
                            </li>
                        </ul>
                    </span>
                </nav>
            </header>
        </>
    );
}
