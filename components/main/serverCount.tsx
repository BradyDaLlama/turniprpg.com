'use client';
import React from 'react';

export default function ServerCount() {
    const [serverCount, setServerCount] = React.useState(0);
    React.useEffect(() => {
        fetch('https://top.gg/api/bots/882808942881816577/stats', {
            method: 'GET',
            headers: {
                Authorization: process.env.NEXT_PUBLIC_TOPGG_API_KEY || '',
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setServerCount(data.server_count);
                });
            }
        });
    }, []);

    return serverCount ? <p className="hook">Used by {serverCount.toLocaleString()} servers!</p> : <p></p>;
}
