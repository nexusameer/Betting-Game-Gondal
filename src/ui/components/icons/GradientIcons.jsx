// GradientIcon.js
import React from 'react';

const GradientIcon = ({ icon, size=20, className='' }) => {
  const permanentGradient = [
    '#a2682a', '#be8c3c', '#be8c3c', '#d3b15f', '#faf0a0', '#ffffc2',
    '#faf0a0', '#d3b15f', '#be8c3c', '#b17b32', '#bb8332', '#d4a245',
    '#e1b453', '#a4692a'
  ];

  return (
    <>
      {React.createElement(icon, {
        style: { fill: `url(#gradient)`, width: size, height: size }, // Set width and height based on the size prop
      })}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            {permanentGradient.map((color, index) => (
              <stop key={index} stopColor={color} offset={`${(index / (permanentGradient.length - 1)) * 100}%`} />
            ))}
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default GradientIcon;
