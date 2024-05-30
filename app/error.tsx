'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-lvh">
            <h2>Something went wrong!</h2>
            <button className="glow-button" onClick={() => (window.location.href = '/')}>
                Main Page
            </button>
        </div>
    );
}
