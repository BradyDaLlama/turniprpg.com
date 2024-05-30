import React from 'react';
import { User, Link } from '@nextui-org/react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <ul className="legal-footer footer-box">
                    <h1>Legal</h1>
                    <li>
                        <a href="terms">Terms of Service</a>
                    </li>
                    <li>
                        <a href="privacy">Privacy Policy</a>
                    </li>
                    <li className="opacity-70">This site does not collect cookies</li>
                </ul>

                <span className="footer-box">
                    <h1>Notes</h1>
                    <User
                        name="Developed By"
                        description={
                            <Link href="/" size="sm" isExternal>
                                @bradydallama
                            </Link>
                        }
                        avatarProps={{
                            src: '/images/icons/turniptestpfpgradient.gif',
                        }}
                        className="footer-developer"
                    />
                    <p className="footer-text">© BradyDaLlama, 2024</p>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
