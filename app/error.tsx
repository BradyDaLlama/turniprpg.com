'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-lvh">
            <h2>Something went wrong!</h2>
            <button
                className="glow-button"
                onClick={() => {
                    if (typeof window === 'undefined') return;
                    window.location.href = '/';
                }}
            >
                Main Page
            </button>
        </div>
    );
}
