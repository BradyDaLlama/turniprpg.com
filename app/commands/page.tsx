'use client';
import React, { useState, useEffect } from 'react';
import { Input, Chip, Code, Spinner } from '@nextui-org/react';
import useLargeScreen from '@/components/hooks/useLargeScreen';
import Tooltip from '@/components/tooltip';

import '@/styles/commands.css';

const chips = {
    info: 'primary',
    utility: 'primary',
    items: 'primary',
    adventure: 'primary',
    user: 'primary',
};

type CommandType = {
    id: string;
    application_id: string;
    version: string;
    default_member_permissions: number | null;
    type: number;
    name: string;
    description: string;
    dm_permission: boolean;
    contexts: [] | null;
    integration_types: [];
    options: [] | null;
    nsfw: boolean;
    args: CommandType[] | null;
    tags: string[] | null;
};

export default function Commands() {
    const isLargeScreen = useLargeScreen();
    const [commands, setCommands] = useState([]);
    const [searchCommand, setCommand] = useState('');
    const [searchTags, setTags] = useState([] as string[]);

    function processCommands(command: CommandType): CommandType[] {
        let commands = [{ ...command, name: command.name }];

        let hasSubcommands = false;
        if (command.options) {
            for (let option of command.options as CommandType[]) {
                if (option.type > 2) {
                    commands = [
                        {
                            ...command,
                            name: `${command.name}`,
                            args: command.options?.filter((option: CommandType) => option.type > 2) as [],
                        },
                    ];
                    continue;
                }
                hasSubcommands = true;
                commands = [
                    ...commands,
                    ...processCommands({
                        ...option,
                        options: option?.options?.filter((option: CommandType) => option.type <= 2) as [],
                        args: option.options?.filter((option: CommandType) => option.type > 2) as [],
                        name: `${command.name}!${option.name}`,
                    }),
                ];
            }
        }

        if (hasSubcommands) {
            commands = commands.filter((cmd) => cmd.name !== command.name);
        }

        return commands;
    }

    function getCommandPrefix(type: number, index: number) {
        switch (type) {
            case 1:
                return index === 0 ? '/' : '';
            case 2:
                return index === 0 ? '>' : '';
            default:
                return '';
        }
    }

    function groupCommands(commands: CommandType[]) {
        const groupedCommands = Object.values(
            commands.reduce((groups: { [key: number]: CommandType[] }, command: CommandType) => {
                const key = command.type > 1 ? 2 : 1;
                if (!groups[key]) groups[key] = [];
                groups[key].push(command);
                return groups;
            }, {})
        ).sort((a, b) => a[0].type - b[0].type);

        return groupedCommands;
    }

    useEffect(() => {
        fetch(`api/bot/commands`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setCommands(data.flatMap(processCommands));
                });
            }
        });
    }, []);

    const handleClose = (tagToRemove: string) => {
        const uniqueTags = Array.from(new Set(searchTags.filter((tag) => tag !== tagToRemove)));
        setTags(uniqueTags);
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
            {!(commands.length > 0) && <Spinner className="loading" aria-label="Fetching commands..." />}
            <div className="commands-container">
                {commands
                    .sort((a: CommandType, b: CommandType) => a.type - b.type || a.name.localeCompare(b.name))
                    .map((command: CommandType, index) => {
                        if (
                            !`/${command.name.replace('!', '')}`.toLowerCase().includes(searchCommand.toLowerCase()) &&
                            !command.description.toLowerCase().includes(searchCommand.toLowerCase())
                            //|| (searchTags.length > 0 && !command?.tags?.some((tag) => searchTags.includes(tag)))
                        ) {
                            return null;
                        }
                        return (
                            <div className="command">
                                <div className="command-chips">
                                    {command.name.split('!').map((name, index) => (
                                        <Tooltip note={`${index === 0 ? 'base command' : 'subcommand'}`}>
                                            <h1
                                                className={
                                                    command.type > 2 && index === command.name.split('!').length - 1
                                                        ? `arg`
                                                        : `command-name${index === command.name.split('!').length - 1 ? ' last-name' : ''}`
                                                }
                                            >
                                                {getCommandPrefix(command.type, index)}
                                                {name}
                                            </h1>
                                        </Tooltip>
                                    ))}
                                    {command.args?.map((arg: CommandType) => (
                                        <Tooltip note={`argument: ${arg.description}`}>
                                            <Code className="arg" color="primary">
                                                {arg.name}
                                            </Code>
                                        </Tooltip>
                                    ))}
                                    {command?.tags?.map((tag: string) => (
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
                                            className="command-tag"
                                            onClick={() => setTags(Array.from(new Set([...searchTags, tag])))}
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
