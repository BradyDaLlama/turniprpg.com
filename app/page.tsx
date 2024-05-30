import HeroSection from '../components/main/herosection';
import Features from '../components/main/features';
import '../styles/index.css';

export default function Home() {
    return (
        <>
            <div>
                <HeroSection />
                <Features />
            </div>
        </>
    );
}
