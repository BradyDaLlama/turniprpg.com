import React from 'react';
import Image from 'next/image';
import Description from './description';

import descriptions from '@/data/descriptions.json';

export default function HeroSection() {
    return (
        <>
            <Image className="titleLogo" src="/images/bot/turnipRPG.png" alt="turnipRPG" width={980} height={310} />
            <p className="hook">Intuitive Commands · Charming Graphics · No Cooldowns</p>
            {descriptions.map((description, index) => (
                <Description
                    key={index}
                    image={description.image}
                    description={description.description}
                    flipImage={index % 2 !== 0}
                />
            ))}
        </>
    );
}
