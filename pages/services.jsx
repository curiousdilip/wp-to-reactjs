import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('https://dev.dilipmaurya.in/wp-json/wp/v2/services?_embed')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched services:', data);
        setServices(data);
      })
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  const getServiceCategories = (service) => {
    // 1. Try taxonomy via wp:term embedded
    const terms =
      service._embedded?.['wp:term']?.flatMap((termList) =>
        termList.map((term) => term.name)
      ) || [];

    // 2. Fallback: ACF field (if you have one)
    const acfCats = service.acf?.category_names || [];

    // Combine both, dedupe
    const combined = Array.from(new Set([...terms, ...acfCats]));
    return combined;
  };

  const uniqueCategories = [
    ...new Set(
      services
        .flatMap((s) => getServiceCategories(s))
        .filter((cat) => typeof cat === 'string' && cat.trim() !== '')
    ),
  ];

  const filteredServices = category
    ? services.filter((s) => {
        const cats = getServiceCategories(s).map((cat) => cat.toLowerCase());
        return cats.includes(category.toLowerCase());
      })
    : services;

  return (
    <div className="container">
      <div className="services">
        <h2>Our Services</h2>

        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="services-cards">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const desc = service.content?.rendered?.replace(/<[^>]+>/g, '') || '';
              const img =
                service._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                '/images/blog1.jpg';
              return (
                <ServiceCard
                  key={service.id}
                  service={{
                    title: service.title?.rendered || '',
                    description: desc,
                    price: service.acf?.price || '₹2000',
                    image: img,
                  }}
                />
              );
            })
          ) : (
            <p>No services found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
