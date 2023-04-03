import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = ({ images }) => {
  return (
    <div className="text-white text-[1.25rem] w-full max-w-[85rem] mx-auto sticky top-[3.125rem]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((img) => (
          <img
            src={img?.attributes.url}
            alt={img?.attributes.name}
            key={img?.id}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
