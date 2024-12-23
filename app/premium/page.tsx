import React, { Component } from 'react';
import '@/styles/premium.css';

import { Code } from '@nextui-org/react';

import options from '@/data/perkOptions.json';
import perks from '@/data/perks.json';

import getUser from '@/app/api/discord/getUser';

export default async function Premium() {
    const user = getUser();

    return (
        <>
            <div className="options-container">
                {perks.map((perk) => {
                    const perkOptions = options.filter((i) => i.bundles.includes(perk.name));
                    return (
                        <div className={`option ${perk?.color}`} key={perk.name}>
                            <h1>{perk.name}</h1>
                            <p>
                                <Code className="price">
                                    {typeof perk.price === 'number' ? ' $' : ' '}
                                    {perk.price}
                                </Code>
                                {perk.subscription}
                            </p>

                            {!!perkOptions.length ? (
                                <p className="note">currently does not provide perks</p>
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
                {perks
                    .filter((i) => options.some((j) => j.bundles.includes(i.name)))
                    .map((item) => {
                        const perkOptions = options.filter((i) => i.bundles.includes(item.name));
                        return (
                            <div className="perks">
                                <h2 className="bundle-name">{item.name}</h2>
                                {perkOptions
                                    ?.sort((a, b) => a.name.localeCompare(b.name))
                                    .map((perk) => (
                                        <div className="perk">
                                            <h2> {perk.name} </h2>
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
