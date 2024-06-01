'use client';
import React from 'react';

import { Input, Chip } from '@nextui-org/react';

import '@/styles/commands.css';

import commands from '@/data/commands.json';
const chips = {
    info: 'primary',
    utility: 'primary',
    items: 'primary',
    adventure: 'primary',
    user: 'primary',
};

export default function Commands() {
    const [searchCommand, setCommand] = React.useState('');
    const [searchTags, setTags] = React.useState([] as string[]);

    const handleClose = (tagToRemove: string) => {
        const uniqueTags = Array.from(new Set(searchTags.filter((tag) => tag !== tagToRemove)));
        setTags(uniqueTags);
        console.log(searchTags);
    };

    return (
        <>
            <h1 className="commands-title">Commands</h1>
            <div className="search-tools">
                <Input
                    className="command-search"
                    variant="bordered"
                    labelPlacement="outside"
                    size="lg"
                    value={searchCommand}
                    onValueChange={setCommand}
                    type="command"
                    label='search for a command | tip: prefix with "/" to search only by command name'
                />
                <div className="search-tags">
                    {searchTags.map((tag) => (
                        <Chip
                            key={tag}
                            color={
                                (chips[tag as keyof typeof chips] as
                                    | 'primary'
                                    | 'warning'
                                    | 'success'
                                    | 'default'
                                    | 'secondary'
                                    | 'danger'
                                    | undefined) || 'default'
                            }
                            size="md"
                            className="command-tag"
                            onClose={() => handleClose(tag)}
                        >
                            {tag}
                        </Chip>
                    ))}
                </div>
            </div>
            <div className="commands-container">
                {commands.map((command: { name: string; description: string; tags?: string[] }, index) => {
                    if (
                        (!`/${command.name}`.toLowerCase().includes(searchCommand.toLowerCase()) &&
                            !command.description.toLowerCase().includes(searchCommand.toLowerCase())) ||
                        (searchTags.length > 0 && !command?.tags?.some((tag) => searchTags.includes(tag)))
                    ) {
                        return null;
                    }
                    return (
                        <div className="command">
                            <div className="command-chips">
                                <h1 className="command-name">/{command.name}</h1>
                                {command?.tags?.sort().map((tag: string) => (
                                    <Chip
                                        key={tag}
                                        color={
                                            (chips[tag as keyof typeof chips] as
                                                | 'primary'
                                                | 'warning'
                                                | 'success'
                                                | 'default'
                                                | 'secondary'
                                                | 'danger'
                                                | undefined) || 'default'
                                        }
                                        size="sm"
                                        className="command-tag"
                                        onClick={() => {
                                            if (!searchTags.includes(tag)) setTags((prev) => [...prev, tag]);
                                        }}
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </div>
                            <p className="command-description">{command.description}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
