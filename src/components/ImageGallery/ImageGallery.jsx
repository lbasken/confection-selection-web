import * as React from 'react';
import "./ImageGallery.css";

export default function ImageGallery(props) {
  return <div>
    <div className="polaroid">
      <img src={props.path} alt={props.alt}/>
      <div className="container">
        <h2>Christmas {props.year} winners!</h2>
        <p><b><i>Best Tasting</i></b>... {props.bestTasting}</p>
        <p><b><i>Most Creative</i></b>... {props.mostCreative}</p>
        <p><b><i>Most Festive</i></b>... {props.mostFestive}</p>
      </div>
    </div>
  </div>
}





