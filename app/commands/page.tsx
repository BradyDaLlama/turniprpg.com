import React from 'react';
import '@/styles/commands.css';

import commands from '@/data/commands.json';
const chips = {
    info: 'primary',
    utility: 'warning',
    items: 'success',
};

export default function Commands() {
    return (
        <>
            <h1 className="commands-title text-xl lg:text-4xl mb-8">Commands</h1>
            <div className="commands-container">
                {commands.map((command: { name: string; description: string; tags?: string[] }, index) => (
                    <div className="command">
                        <div className="command-chips">
                            <h1 className="command-name">/{command.name}</h1>
                            {/* {command?.tags?.map((tag: string) => (
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
                                    >
                                        {tag}
                                    </Chip>
                                ))} */}
                        </div>
                        <p className="command-description">{command.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
