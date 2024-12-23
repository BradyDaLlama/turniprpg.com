import '@/styles/terms.css';
import terms from '@/data/terms.json';

export default function Terms() {
    return (
        <>
            <h1 id="terms">turnipRPG Terms of Usage</h1>
            <p>
                By using the bot turnipRPG, you agree to the terms. In these terms and Privacy Policy, turnipRPG may be referred
                to as "we", "us", "bot", "the bot", or "turnipRPG".
            </p>
            {terms.map((term, index) => (
                <div className="term">
                    <h2>
                        {index + 1}. {term.title}
                    </h2>
                    <ul className="list-box">
                        {term.terms.map((term: string, index: number) => {
                            const matches = term.match(/^\d+\..*/g);
                            if (matches) {
                                const items = term.split(/\d+\./g).map((item) => item.trim());
                                items.shift();
                                return (
                                    <ol key={index}>
                                        {items.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ol>
                                );
                            } else {
                                return <li key={index}>{term}</li>;
                            }
                        })}
                    </ul>
                </div>
            ))}
            <p>Last updated: December 23, 2024</p>
        </>
    );
}
