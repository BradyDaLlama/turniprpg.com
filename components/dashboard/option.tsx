'use client';
import React, { useEffect, useState } from 'react';

import { Select, SelectItem } from "@heroui/react";

export default function ServerList({ guildId, option }: { guildId: string; option: string }) {
    const [options, setOptions] = useState([] as any[]);

    useEffect(() => {
        const fetchOptions = async () => {
            console.log(`/api/bot/config/${guildId}/options/${option}`);
            const result = await fetch(`/api/bot/config/${guildId}/options/${option}`).then((res) => res.json());
            setOptions(result);
        };

        fetchOptions();
    }, []);

    return (
        <Select>
            {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
    );
}
