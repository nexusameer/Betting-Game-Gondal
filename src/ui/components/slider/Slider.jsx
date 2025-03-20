import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://i.imgur.com/8iJRkqf.jpg',
    'https://i.imgur.com/N0sXTJh.png',
    'https://i.imgur.com/ubRyDcm.png',
    'https://i.imgur.com/3Lb6mws.png',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  };

  // Auto change every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]); // Include currentIndex in the dependencies to re-run the effect when currentIndex changes

  return (
    <div className="relative  sm:h-64 xl:h-80 2xl:h-96 overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="h-56 sm:h-64 xl:h-80 2xl:h-96" />
        ))}
      </div>

      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full" onClick={prevSlide}>
        {'<'}
      </button>
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full" onClick={nextSlide}>
        {'>'}
      </button>
    </div>
  );
};

export default Slider;
