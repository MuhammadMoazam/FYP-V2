import React, { useState, useEffect, useCallback } from 'react';
import image1 from 'Assets/Slider/1.jpg';
import image2 from 'Assets/Slider/2.jpg';
import image3 from 'Assets/Slider/3.jpg';
import './Slider.css';

const slides = [
  {
    title: "FASHION THAT",
    subtitle: "FITS YOUR",
    lifestyle: "LIFESTYLE",
    description: "Stylish, comfortable, and ready for any occasion.",
    image: image1,
    color: "#ff4d4d"
  },
  {
    title: "EXPLORE OUR",
    subtitle: "NEW COLLECTION",
    lifestyle: "FOR EVERYONE",
    description: "Discover the latest trends and styles.",
    image: image2,
    color: "#4d94ff"
  },
  {
    title: "UNMATCHED",
    subtitle: "QUALITY & STYLE",
    lifestyle: "Low Prices",
    description: "Shop with confidence and style.",
    image: image3,
    color: "#47d147"
  }
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');

  const getVisibleSlides = () => {
    const lastIndex = slides.length - 1;
    const visibleSlides = [
      { ...slides[currentSlide === 0 ? lastIndex : currentSlide - 1], position: -1 },
      { ...slides[currentSlide], position: 0 },
      { ...slides[currentSlide === lastIndex ? 0 : currentSlide + 1], position: 1 }
    ];
    return visibleSlides;
  };

  const changeSlide = useCallback((index, direction = 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPreviousSlide(currentSlide);
    setSlideDirection(direction);
    setCurrentSlide(index);
    
    // Clear previous slide after animation
    setTimeout(() => {
      setIsAnimating(false);
      setPreviousSlide(null);
    }, 800);
  }, [isAnimating, currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      changeSlide(nextIndex, 'next');
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, changeSlide]);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    changeSlide(nextIndex, 'next');
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prevIndex, 'prev');
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {getVisibleSlides().map((slide, index) => {
          const isPrevious = previousSlide !== null && 
            ((slideDirection === 'next' && slide.position === -1) ||
             (slideDirection === 'prev' && slide.position === 1));
          
          return (
            <div
              key={slide.position}
              className={`slide 
                ${slide.position === 0 ? 'active' : ''} 
                ${isPrevious ? 'previous' : ''} 
                ${isAnimating && slide.position === 0 ? 'sliding' : ''}
              `}
              style={{
                transform: `translateX(${slide.position * 100}%)`,
                zIndex: slide.position === 0 ? 2 : isPrevious ? 1 : 0
              }}
            >
              <div className="slide-content">
                <div className="text-content" style={{ backgroundColor: `${slide.color}40` }}>
                  <h1 className="animated-text">
                    <span>{slide.title}</span>
                    <span>{slide.subtitle}</span>
                    <span className="lifestyle">{slide.lifestyle}</span>
                  </h1>
                  <p className="description">{slide.description}</p>
                  <button className="shop-button" style={{ backgroundColor: slide.color }}>
                    Shop Now <span className="arrow">→</span>
                  </button>
                </div>
                <div 
                  className="image-container"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="navigation">
        <button className="nav-button prev" onClick={prevSlide}>
          <span>❮</span>
        </button>
        <div className="dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => changeSlide(index)}
              style={{
                backgroundColor: currentSlide === index ? slides[index].color : '#ffffff'
              }}
            />
          ))}
        </div>
        <button className="nav-button next" onClick={nextSlide}>
          <span>❯</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;