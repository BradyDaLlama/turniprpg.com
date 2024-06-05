'use client';

import Image from 'next/image';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Skeleton } from '@nextui-org/react';

export default function HeaderDropdown({ pfp }: { pfp: JSX.Element }) {
    return (
        <span className="pfp-dropdown">
            <Dropdown backdrop={'transparent'}>
                <DropdownTrigger>
                    <span>
                        <div className="drop-arrow"></div>
                        {pfp}
                    </span>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" className="text-lg">
                    {/* <DropdownItem key="profile">Profile</DropdownItem> */}
                    <DropdownItem href="/api/discord/logout" key="logout" className="text-danger" color="danger">
                        Log out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </span>
    );
}
