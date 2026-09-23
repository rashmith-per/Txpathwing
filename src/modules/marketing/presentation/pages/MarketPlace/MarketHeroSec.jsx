import React, { useEffect, useState } from 'react';
import ai from '../../../../../assets/marketplaceImages/ai-data.png'
import career from '../../../../../assets/marketplaceImages/career.png'
import cloud from '../../../../../assets/marketplaceImages/cloud-devops.png'
import software from '../../../../../assets/marketplaceImages/software-development.png'
import testing from '../../../../../assets/marketplaceImages/testing.png'
import './MarketHeroSec.css'



function BannerCarousel() {
    const bannerImages = [ai,career,cloud,software,testing,];

  const slides = [
    bannerImages[bannerImages.length - 1],
    ...bannerImages,
    bannerImages[0],
  ];

  const [currentSlide, setCurrentSlide] = useState(1);

  const [isTransitioning, setIsTransitioning] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {

    if (currentSlide === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    }

    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(bannerImages.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  const handlePrevious = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const activeDot =
    currentSlide === 0
      ? bannerImages.length - 1
      : currentSlide === slides.length - 1
      ? 0
      : currentSlide - 1;

  return (
    <section className="banner-carousel">
      <div className="banner-window">

        <div
          className="banner-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isTransitioning
              ? "transform 0.7s ease-in-out"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((image, index) => (
            <div className="banner-slide" key={index}>
              <img
                src={image}
                alt={`Banner ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          className="banner-arrow banner-prev"
          onClick={handlePrevious}
        >
          ‹
        </button>

        <button
          className="banner-arrow banner-next"
          onClick={handleNext}
        >
          ›
        </button>

      </div>

      <div className="banner-dots">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${
              activeDot === index ? "active" : ""
            }`}
            onClick={() => {
              setCurrentSlide(index + 1);
            }}
          />
        ))}
      </div>

    </section>
  );
}

export default BannerCarousel;