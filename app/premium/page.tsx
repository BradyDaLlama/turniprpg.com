import React, { Component } from 'react';
import '@/styles/premium.css';

import { Code } from '@nextui-org/react';

import perks from '@/data/perks.json';

export default async function Premium() {
    return (
        <>
            <div className="options-container">
                <div className="option">
                    <h1>turnipRPG Premium</h1>
                    <p>
                        <Code className="price">$3.49</Code>/ month
                    </p>

                    <p className="note"> currently does not provide perks</p>

                    {false ? (
                        <a className="glow-button" href="https://buy.stripe.com/3cs29f3fR16O8ZW145">
                            Get Premium
                        </a>
                    ) : (
                        <a className="glow-button" href="/">
                            Log in to get Premium
                        </a>
                    )}
                </div>

                <div className="option">
                    <h1>turnipRPG tip</h1>
                    <p>custom amount</p>

                    <p className="note"> does not provide perks</p>

                    <a className="glow-button" href="https://donate.stripe.com/14keW17w7dTAcc83cc">
                        Give a tip
                    </a>
                </div>
            </div>
            <div className="perks-container">
                <h1>What will be included in the future?*</h1>
                <div className="perks">
                    {perks.map((perk) => (
                        <div className="perk">
                            <h2> {perk.name} </h2>
                            <p> {perk.description} </p>
                        </div>
                    ))}
                </div>
                <p>*These perks are not yet included in turnipRPG premium</p>
            </div>
            <img className="powered-by" src="/images/icons/StripeBlurple.svg" alt="Powered By Stripe" />
        </>
    );
}
