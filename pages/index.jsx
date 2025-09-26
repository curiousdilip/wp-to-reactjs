import HeroBanner from '../components/HeroBanner';

export default function Home() {
  return (
    <div className="hero-section">
      <div className="container">
        <HeroBanner />
        <p >Welcome to our service portal. Explore our services and wellness blogs.</p>
      </div>
    </div>
  );
}