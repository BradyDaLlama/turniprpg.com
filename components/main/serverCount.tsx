'use client';
import React, { useState, useEffect } from 'react';
import Counter from '../counter';

export default function ServerCount() {
    const [serverCount, setServerCount] = useState<number>(0);
    useEffect(() => {
        fetch(`api/bot/stats`).then((response) => {
            console.log('got response');
            if (response.ok) {
                response.json().then((data) => {
                    console.log('data', data);
                    setServerCount(data.serverCount);
                });
            }
        });
    }, []);

    return (
        <p className="hook">
            used by over <Counter value={serverCount} className="hook" /> servers!
        </p>
    );
}
