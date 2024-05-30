'use client';

import { useEffect, useState } from 'react';

export default function useLargeScreen() {
    const [largeScreen, setLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setLargeScreen(true);
            } else {
                setLargeScreen(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return largeScreen;
}
