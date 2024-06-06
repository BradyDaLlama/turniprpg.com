'use client';
import React from 'react';
import Counter from '../counter';

export default function ServerCount() {
    const [serverCount, setServerCount] = React.useState(0);
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/bot/stats`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setServerCount(data.approximate_guild_count);
                });
            }
        });
    }, []);

    return (
        <p className="hook">
            used by over <Counter value={serverCount || 0} className="hook" /> servers!
        </p>
    );
}
