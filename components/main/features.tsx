import React from 'react';
import Feature from './feature';
import features from '@/data/features.json';

export default function Features() {
    return (
        <>
            {features.map((feature, index) => (
                <Feature key={index} title={feature.title} description={feature.description} flipImage={index % 2 !== 0} />
            ))}
            <p className="text-md lg:text-xl">
                There's more features, but these are the main ones. Check through the '/' command menu list, or use '/help' to
                get a list of them!
            </p>
        </>
    );
}
