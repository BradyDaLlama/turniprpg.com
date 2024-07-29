'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/cards.css';

import { Pagination } from '@nextui-org/react';

import { Card as CardType } from '../../types/card';
import Card from '../../components/cards/card';

import useLargeScreen from '@/components/hooks/useLargeScreen';

function Page({ total, page, onChange }: { total: number; page: number; onChange: (page: number) => void }) {
    const largeScreen = useLargeScreen();
    const size = largeScreen ? 'md' : 'sm';
    return (
        <Pagination
            total={total}
            page={page}
            onChange={onChange}
            size={size}
            isCompact={!largeScreen}
            showControls={true}
            className="pagination"
        />
    );
}

export default function Cards() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ starCount: [], elements: [], starTypes: [] } as {
        starCount: number[];
        elements: string[];
        starTypes: string[];
        [key: string]: string[] | number[];
    });
    const [perPage, setPerPage] = useState(80);
    const [total, setTotal] = useState(Math.ceil(cards.length / perPage));

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/bot/cards?page=${currentPage || 1}&limit=${perPage}`).then((response) => {
            const totalHeader = parseInt(response.headers.get('X-Total-Count') || '0');
            const newTotal = Math.ceil(totalHeader / perPage);
            setTotal(newTotal);
            setCurrentPage(Math.min(currentPage, newTotal));

            response.json().then((data) => {
                console.log(data);
                setCards(data);
            });
        });
    }, []);

    function filterCards(card: CardType) {
        const starCount = filters.starCount.length === 0 || filters.starCount.includes(card.stars.length);
        const elements = filters.elements.length === 0 || filters.elements.some((element) => card.elements.includes(element));
        const starTypes = filters.starTypes.length === 0 || filters.starTypes.some((starType) => card.stars.includes(starType));
        return starCount && elements && starTypes;
    }

    useEffect(() => {
        let filterQuery = '';
        for (const key in filters) {
            if (filters[key].length > 0) {
                filterQuery += `&${key}=${filters[key].join(',')}`;
            }
        }

        fetch(`${process.env.NEXT_PUBLIC_API}/bot/cards?page=${currentPage}&limit=${perPage}${filterQuery}`).then(
            (response) => {
                const totalHeader = parseInt(response.headers.get('X-Total-Count') || '0');
                const newTotal = Math.ceil(totalHeader / perPage);
                setTotal(newTotal);
                setCurrentPage(Math.min(currentPage, newTotal));

                response.json().then((data) => setCards(data));
            }
        );
    }, [filters, currentPage]);

    return (
        <>
            <h1>Card List</h1>
            <div className="card-header">
                <div className="card-filters" id="card-filters">
                    <span className="starcount-filter">
                        {new Array(5).fill(0).map((_, i) => {
                            i++;
                            return (
                                <label key={i}>
                                    <input
                                        type="checkbox"
                                        name="stars"
                                        value={i}
                                        checked={filters.starCount.includes(i)}
                                        onChange={(e) => {
                                            const starCount = filters.starCount.includes(i)
                                                ? filters.starCount.filter((star) => star !== i)
                                                : [...filters.starCount, i];
                                            setFilters({ ...filters, starCount });
                                        }}
                                    />
                                    {i}*
                                </label>
                            );
                        })}
                    </span>
                    <span className="element-filter star-filter">
                        {['fire', 'water', 'earth', 'plant', 'air'].map((element) => (
                            <label key={element}>
                                <input
                                    type="checkbox"
                                    name="elements"
                                    value={element}
                                    checked={filters.elements.includes(element)}
                                    onChange={(e) => {
                                        const elements = filters.elements.includes(element)
                                            ? filters.elements.filter((el) => el !== element)
                                            : [...filters.elements, element];
                                        setFilters({ ...filters, elements });
                                    }}
                                />
                                <img src={`/images/cards/${element}.png`} alt={`${element} element`} className="star" />
                            </label>
                        ))}
                    </span>
                    <span className="star-filter">
                        {['melee', 'shield', 'heal', 'spell', 'turn', 'sacrifice'].map((star) => (
                            <label key={star}>
                                <input
                                    type="checkbox"
                                    name="stars"
                                    value={star}
                                    checked={filters.starTypes.includes(star)}
                                    onChange={(e) => {
                                        const starTypes = filters.starTypes.includes(star)
                                            ? filters.starTypes.filter((s) => s !== star)
                                            : [...filters.starTypes, star];
                                        setFilters({ ...filters, starTypes });
                                    }}
                                />
                                <img src={`/images/cards/${star}.png`} alt={`${star} star`} className="star" />
                            </label>
                        ))}
                    </span>
                </div>
                <div className="card-sort"></div>
                <Page total={total} page={currentPage} onChange={setCurrentPage} />
            </div>
            <div className="cards">
                {cards
                    .filter(filterCards)
                    .slice((currentPage - 1) * perPage, currentPage * perPage)
                    .map((card) => (
                        <Card key={card.cardID} card={card} />
                    ))}
            </div>
            <Page total={total} page={currentPage} onChange={setCurrentPage} />
            <a href="#card-filters">Back to top</a>
        </>
    );
}
