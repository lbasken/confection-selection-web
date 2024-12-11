import * as React from 'react';
import "./ImageGallery.css";

export default function ImageGallery() {
  return <div className="polaroid">
    <img src="https://webdev-images.s3.us-east-1.amazonaws.com/confection-selection/chr2023.JPG" alt="christmas 2023" />
    <div className="container">
      <h2>Christmas 2023 winners!</h2>
      <p><b><i>Best Tasting</i></b>... Celeste's Powder Puff Cookies</p>
      <p><b><i>Most Creative</i></b>... Chris' 'Letters to Santa' Cookies</p>
      <p><b><i>Most Festive</i></b>... Halley's Grinch Cookies</p>
    </div>
  </div>
}





