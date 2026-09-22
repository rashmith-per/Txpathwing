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

  // Start at actual first image
  const [currentSlide, setCurrentSlide] = useState(1);

  const [isTransitioning, setIsTransitioning] = useState(true);

  /*
    Automatic sliding
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /*
    When reaching cloned slides,
    silently move to the real slide.
  */
  const handleTransitionEnd = () => {
    // We reached cloned first image
    if (currentSlide === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    }

    // We reached cloned last image
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(bannerImages.length);
    }
  };

  /*
    Re-enable animation after instant reposition
  */
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [isTransitioning]);

  /*
    Previous button
  */
  const handlePrevious = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  /*
    Next button
  */
  const handleNext = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  /*
    Dot position
  */
  const activeDot =
    currentSlide === 0
      ? bannerImages.length - 1
      : currentSlide === slides.length - 1
      ? 0
      : currentSlide - 1;

  return (
    <section className="banner-carousel">

      {/* SLIDER */}
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

        {/* PREVIOUS */}
        <button
          className="banner-arrow banner-prev"
          onClick={handlePrevious}
        >
          ‹
        </button>

        {/* NEXT */}
        <button
          className="banner-arrow banner-next"
          onClick={handleNext}
        >
          ›
        </button>

      </div>

      {/* DOTS */}
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