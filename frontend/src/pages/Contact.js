import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We received your message.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-intro">
        Have questions or want to collaborate? Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      <div className="contact-card">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-textarea"
          />
          <button type="submit" className="contact-submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Our Office</h3>
          <p>Startup Inc.</p>
          <p>123 Innovation Drive</p>
          <p>Silicon Valley, CA 94043</p>
          <p>Email: hello@startup.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
