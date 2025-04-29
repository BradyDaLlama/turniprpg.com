'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

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
                <DropdownMenu
                    aria-label="Static Actions"
                    className="text-lg"
                    onAction={() => (window.location.href = `/api/discord/logout`)}
                >
                    {/* <DropdownItem key="profile">Profile</DropdownItem> */}
                    <DropdownItem href="/api/discord/logout" key="logout" className="text-danger" color="danger">
                        Log out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </span>
    );
}
