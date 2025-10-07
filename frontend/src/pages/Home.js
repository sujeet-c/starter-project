import React, { useState, useEffect } from "react";
import "./Home.css";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";

function Home() {
  const heroImages = [hero1, hero2, hero3, hero4];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + heroImages.length) % heroImages.length);
  };

  const products = [
    { id: 1, title: "Product One", description: "This is a great product that solves problem X.", image: product1 },
    { id: 2, title: "Product Two", description: "An innovative solution for modern challenges.", image: product2 },
    { id: 3, title: "Product Three", description: "Designed to make your life easier.", image: product3 }
  ];

  return (
    <div className="home-container">
      {/* Hero Slider */}
      <div className="hero-section">
        <button className="prev-btn" onClick={prevSlide}>❮</button>
        <img src={heroImages[currentIndex]} alt="Hero" className="hero-image" />
        <button className="next-btn" onClick={nextSlide}>❯</button>
      </div>

      {/* Product Section */}
      <div className="product-section">
        <h2>Our Products</h2>
        <div className="product-cards">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
