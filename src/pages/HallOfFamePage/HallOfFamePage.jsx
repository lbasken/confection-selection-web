import "./HallOfFamePage.css";
import ImageGallery from "../../components/ImageGallery/ImageGallery.jsx";

export default function HallOfFamePage() {
  return <div>
    <ImageGallery
      path="https://dsfryfk10djp2.cloudfront.net/confection-selection/chr2023.JPG"
      alt="christmas 2023"
      year="2023"
      bestTasting="Celeste's Powder Puff Cookies"
      mostCreative="Chris' 'Letters to Santa' Cookies"
      mostFestive="Halley's Grinch Cookies"
    />
    <ImageGallery
      path="https://dsfryfk10djp2.cloudfront.net/confection-selection/chr2024.jpg"
      alt="christmas 2024"
      year="2024"
      bestTasting="Riley's Hot Cocoa Cookies"
      mostCreative="Riley's Hot Cocoa Cookies"
      mostFestive="Halley's Santa Cookies"
    />
  </div>
}
