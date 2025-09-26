export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <img src={service.image} alt={service.title} width="100%" />
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <strong>{service.price}</strong>
    </div>
  );
}
