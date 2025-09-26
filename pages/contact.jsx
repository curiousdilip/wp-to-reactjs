import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted: ' + JSON.stringify(form, null, 2));
    setForm({ name: '', email: '', message: '' });
  };

  return (
   <div className="container">
    <div className="contact">

       <h2>Contact Us</h2>
       <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
      <button type="submit">Send</button>
    </form>
    </div>
   </div>
  );
}
