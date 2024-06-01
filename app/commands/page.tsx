'use client';
import React from 'react';

import { Input, Chip, Code, Tooltip, CircularProgress } from '@nextui-org/react';

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
    args: [] | null;
};

export default function Commands() {
    const [commands, setCommands] = React.useState([]);
    const [searchCommand, setCommand] = React.useState('');
    const [searchTags, setTags] = React.useState([] as string[]);

    function processCommands(command: CommandType): CommandType[] {
        let commands = [{ ...command, name: command.name }];

        if (command.options) {
            for (let option of command.options as CommandType[]) {
                if (option.type > 2) continue;
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

    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/bot/commands`).then((response) => {
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
            <div className="commands-container">
                {!(commands.length > 0) && <CircularProgress aria-label="Fetching commands..." />}
                {commands
                    .sort((a: CommandType, b: CommandType) => a.type - b.type || a.name.localeCompare(b.name))
                    .map((command: CommandType, index) => {
                        if (
                            (!`/${command.name.replace('!', '')}`.toLowerCase().includes(searchCommand.toLowerCase()) &&
                                !command.description.toLowerCase().includes(searchCommand.toLowerCase()))
                            //|| (searchTags.length > 0 && !command?.tags?.some((tag) => searchTags.includes(tag)))
                        ) {
                            return null;
                        }
                        return (
                            <div className="command">
                                <div className="command-chips">
                                    {command.name.split('!').map((name, index) => (
                                        <Tooltip
                                            showArrow={true}
                                            color="primary"
                                            closeDelay={100}
                                            content={`${index === 0 ? 'base command' : 'subcommand'}`}
                                        >
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
                                        <Tooltip
                                            showArrow={true}
                                            color="primary"
                                            closeDelay={100}
                                            content={`argument: ${arg.description}`}
                                        >
                                            <Code className="arg">{arg.name}</Code>
                                        </Tooltip>
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
