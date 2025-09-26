import services from '../data/services.json';
import ServiceCard from '../components/ServiceCard';
import { useState } from 'react';

export default function Services() {
  const [category, setCategory] = useState('');
  const filtered = category
    ? services.filter((s) => s.category === category)
    : services;

  const uniqueCategories = [...new Set(services.map((s) => s.category))];

  return (
 <div className="container">
     <div className='services'>
      <h2>Our Services</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className='services-cards'>
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
 </div>
  );
}