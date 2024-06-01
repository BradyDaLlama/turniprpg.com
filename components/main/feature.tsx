'use client';

import React from 'react';
import Image from 'next/image';
import useLargeScreen from '@/components/hooks/useLargeScreen';

export default function Features(props: { title: string; description: string[]; flipImage: boolean }) {
    const { title, description, flipImage } = props;
    const filePath = title.toLowerCase().replace(/ /g, '');
    const largeScreen = useLargeScreen();

    const items = [
        <img className="feature-image" src={`/images/bot/${filePath}.png`} height={400} width={400} alt={title} />,

        <ul>
            {description.map((desc, index) => (
                <li key={index}>{desc}</li>
            ))}
        </ul>,
    ];

    return (
        <div className="feature">
            <h1> {title} </h1>
            <div className="feature-container">{flipImage && largeScreen ? items.reverse() : items}</div>
        </div>
    );
}
