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
                        {term.terms.map((term: string) => (
                            <li>{term}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <p>Last updated: May 28, 2024</p>
        </>
    );
}
