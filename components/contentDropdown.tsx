'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

export default function ContentDropdown() {
    return (
        <Dropdown backdrop={'transparent'}>
            <DropdownTrigger>
                <a>Content</a>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Static Actions"
                className="dropdown-content"
                onAction={(action) => (window.location.href = `/${action}`)}
            >
                <DropdownItem key="commands" href="/commands" className="dropdown-item">
                    Commands
                </DropdownItem>
                <DropdownItem key="cards" href="/cards" className="dropdown-item">
                    Cards
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
