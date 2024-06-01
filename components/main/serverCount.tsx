'use client';
import React from 'react';

export default function ServerCount() {
    const [serverCount, setServerCount] = React.useState(0);
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/bot/stats`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setServerCount(data.server_count);
                });
            }
        });
    }, []);

    return serverCount ? <p className="hook">Used by {serverCount.toLocaleString()} servers!</p> : <p></p>;
}
