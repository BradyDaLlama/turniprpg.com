import '@/styles/terms.css';
import privacy from '@/data/privacy.json';

export default function Privacy() {
    return (
        <>
            <h1 id="privacy">turnipRPG Privacy Policy</h1>
            <p className="privacy-note">
                This Privacy Policy describes how the turnipRPG Discord bot ("turnipRPG") collects, uses, and protects user
                data. By using turnipRPG, you agree to the practices outlined in this policy.
            </p>
            {privacy.map((policy, index) => (
                <div className="term" id={policy.title.toLowerCase().replace(' ', '-')}>
                    <a href={`#${policy.title.toLowerCase().replace(' ', '-')}`}>
                        <h2>
                            {index + 1}. {policy.title}
                        </h2>
                    </a>
                    {(policy.policies && (
                        <ul className="list-box">
                            {policy.policies.map((x: string) => (
                                <li>{x}</li>
                            ))}
                        </ul>
                    )) ||
                        (policy.dataTable && (
                            <div className="data-table">
                                {policy.dataTable.map((data, index) => (
                                    <span className="data-row">
                                        <h3 className="data-collection">{data.dataCollection}</h3>
                                        <p className="purpose">{data.purpose}</p>
                                    </span>
                                ))}
                            </div>
                        ))}
                </div>
            ))}
            <p>Last updated: December 23, 2024</p>
        </>
    );
}
