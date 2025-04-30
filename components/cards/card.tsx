'use client';
import React, { useState } from 'react';

import { Card as CardType } from '../../types/card';

export default function Card({ card }: { card: CardType }) {
    const { name, cardID, energy, element, description, stars } = card; // Deconstructing the card object
    const [flipped, setIsFlipped] = useState(false);

    return (
        <div className="card" onClick={() => setIsFlipped(!flipped)}>
            <h2>
                {name || cardID}
                <span className="card-info">
                    {new Array(energy ?? 0).fill(0).map((_, index) => (
                        <img key={index} src={`/images/cards/${element}.png`} alt="energy" className="star" />
                    ))}
                </span>
            </h2>
            <div className="card-info card-stars">
                <p className="card-description">{description}</p>
                <span>
                    {stars.map((star) => (
                        <img key={star} src={`/images/cards/${star}.png`} alt={`${star} star`} className="star" />
                    ))}
                </span>
            </div>
            <div className="battle-outline-box">
                <div className="battle-outline" />
            </div>
        </div>
    );
}
