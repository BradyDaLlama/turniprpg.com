'use client';
import React from 'react';

import { Card as CardType } from '../../types/card';

export default function Card({ card }: { card: CardType }) {
    return (
        <div className="card">
            <h2>
                {card?.name || card.cardID}
                <span className="card-stars">
                    {card.elements.map((element) => (
                        <img key={element} src={`/images/cards/${element}.png`} alt={`${element} element`} className="star" />
                    ))}
                </span>
            </h2>
            <div className="card-stars">
                <span>
                    {card.stars.map((star) => (
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
