import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="relative text-white w-full text-[1.25rem] max-w-[85rem] mx-auto select-none">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            className="absolute right-[1.9375rem] md:right-[3.1875rem] bottom-0 w-[1.875rem] md:w-[3.125rem] h-[1.875rem] md:h-[3.125rem] bg-black z-10 flex items-center justify-center hover:opacity-90 cursor-pointer group"
            onClick={clickHandler}
          >
            <BsArrowLeft className="text-sm md:text-lg group-hover:scale-125 transition" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            className="absolute right-0 bottom-0 w-[1.875rem] md:w-[3.125rem] h-[1.875rem] md:h-[3.125rem] bg-black z-10 flex items-center justify-center hover:opacity-90 cursor-pointer group"
            onClick={clickHandler}
          >
            <BsArrowRight className="text-sm md:text-lg group-hover:scale-125 transition" />
          </div>
        )}
      >
        <div>
          <Image
            src="/slide-1.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
            width={1360}
            height={595}
            alt="slideImg1"
          />

          <div className="px-[0.9375rem] md:px-[2.5rem] py-[0.625rem] md:py-[1.5625rem] font-oswald bg-white absolute bottom-[1.5625rem] md:bottom-[4.6875rem] left-0 text-black/[0.9] text-[0.9375rem] md:text-[1.875rem] font-medium cursor-pointer hover:opacity-90 uppercase">
            SHOP NOW
          </div>
        </div>

        <div>
          <Image
            src="/slide-2.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
            width={1360}
            height={595}
            alt="slideImg2"
          />

          <div className="px-[0.9375rem] md:px-[2.5rem] py-[0.625rem] md:py-[1.5625rem] font-oswald bg-white absolute bottom-[1.5625rem] md:bottom-[4.6875rem] left-0 text-black/[0.9] text-[0.9375rem] md:text-[1.875rem] font-medium cursor-pointer hover:opacity-90 uppercase">
            SHOP NOW
          </div>
        </div>

        <div>
          <Image
            src="/slide-3.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
            width={1360}
            height={595}
            alt="slideImg3"
          />

          <div className="px-[0.9375rem] md:px-[2.5rem] py-[0.625rem] md:py-[1.5625rem] font-oswald bg-white absolute bottom-[1.5625rem] md:bottom-[4.6875rem] left-0 text-black/[0.9] text-[0.9375rem] md:text-[1.875rem] font-medium cursor-pointer hover:opacity-90 uppercase">
            SHOP NOW
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
