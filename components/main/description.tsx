'use client';

import React from 'react';
import useLargeScreen from '@/components/hooks/useLargeScreen';

export default function Description(props: { image: string; description: string; flipImage: boolean }) {
    const { image, description, flipImage } = props;
    const largeScreen = useLargeScreen();

    const items = [
        <img className="description-img" src={`/images/bot/${image}.png`} height={320} width={320} alt={image} />,
        <p className="description text-xl lg:text-3xl">{description}</p>,
    ];

    return <div className="description-container feature-container">{flipImage && largeScreen ? items.reverse() : items}</div>;
}
