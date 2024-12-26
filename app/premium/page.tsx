import React, { Component } from 'react';
import '@/styles/premium.css';

import { Code } from '@nextui-org/react';

import perks from '@/data/perkOptions.json';
import bundles from '@/data/perks.json';

perks.sort((a, b) => b.bundles.length - a.bundles.length);
bundles.sort((a, b) => {
    // each perk has a score of how many bundles it is a part of
    const scores = perks.map((option) => ({ name: option.name, score: option.bundles.length }));
    // for each perk, compare the scores of how many bundles it is a part of
    return (scores.find((i) => i.name === a.name)?.score || 0) - (scores.find((i) => i.name === b.name)?.score || 0);
});

import getUser from '@/app/api/discord/getUser';

export default async function Premium() {
    const user = getUser();

    return (
        <>
            <div className="options-container">
                {bundles.map((perk) => {
                    const perkOptions = perks.filter((i) => i.bundles.includes(perk.name));
                    return (
                        <div className={`option ${perk?.color}`} key={perk.name}>
                            <h1>{perk.name}</h1>
                            <p>
                                <Code className="price">
                                    {typeof perk.price === 'number' && '$'}
                                    {perk.price}
                                </Code>
                                {perk.subscription && ` ${perk.subscription}`}
                            </p>

                            {!!perkOptions.length ? (
                                <p className="note">
                                    {`${perkOptions.length} perk${perkOptions.length > 1 ? 's' : ''} included`}
                                </p>
                            ) : (
                                <p className="note">does not provide perks</p>
                            )}

                            {user ? (
                                <a className="glow-button" href="/">
                                    Get {perk.name}
                                </a>
                            ) : (
                                <a className="glow-button" href="/">
                                    Log in to buy {perk.name}
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>

            <h1 className="perks-header">What will be included in the future?*</h1>
            <div className="perks-container">
                {bundles
                    .filter((i) => perks.some((j) => j.bundles.includes(i.name)))
                    .map((bundle) => {
                        const perkOptions = perks.filter((i) => i.bundles.includes(bundle.name));
                        return (
                            <div className="perks">
                                <h2 className={`bundle-name ${bundle.color}`}>{bundle.name}</h2>
                                {perkOptions.map((perk) => (
                                    <div className="perk">
                                        <h2 className={`perk-name ${bundle.color}`}> {perk.name} </h2>
                                        <p> {perk.description} </p>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
            </div>
            <p className="note">*perks are currently not provided and may be subject to change. Terms and conditions apply.</p>

            <img className="powered-by" src="/images/icons/StripeBlurple.svg" alt="Powered By Stripe" />
        </>
    );
}
