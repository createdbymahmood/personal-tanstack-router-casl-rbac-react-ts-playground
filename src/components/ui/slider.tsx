"use client";
import { useEffect } from "react";
import "swiper/css";

import "swiper/css/navigation";

export function Slider() {
  useEffect(() => {
    import("swiper").then(Swiper => {
      import("./effect-material.esm").then(EffectMaterial => {
        const swiper = new Swiper.default(".swiper", {
          modules: [EffectMaterial.default],
          effect: "material",
          // materialEffect: {
          //   slideSplitRatio: 0.65,
          // },
          grabCursor: true,
          slidesPerView: 2,
          spaceBetween: 16,
          speed: 600,
          loop: true,
          // autoplay: {
          //   delay: 1000, // Set the autoplay delay in milliseconds (3 seconds in this example)
          // },
          // navigation: {
          //   prevEl: '.swiper-button-prev', // CSS selector for the previous button
          //   nextEl: '.swiper-button-next', // CSS selector for the next button
          // },
        });
      });
    });
  }, []);

  return (
    <div id="app">
      <div className="demo-slider">
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                  <img
                    alt="Slide 1"
                    className="demo-material-image"
                    data-swiper-material-scale="1.25"
                    src="https://material-you-slider.uiinitiative.com/images/01.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                  <img
                    alt="Slide 2"
                    className="demo-material-image"
                    data-swiper-material-scale="1.25"
                    src="https://material-you-slider.uiinitiative.com/images/02.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                  <img
                    alt="Slide 3"
                    width={100}
                    height={100}
                    className="demo-material-image"
                    data-swiper-material-scale="1.25"
                    src="https://material-you-slider.uiinitiative.com/images/03.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                  <img
                    alt="Slide 4"
                    className="demo-material-image"
                    data-swiper-material-scale="1.25"
                    src="https://material-you-slider.uiinitiative.com/images/04.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content">
                  <img
                    alt="Slide 5"
                    className="demo-material-image"
                    data-swiper-material-scale="1.25"
                    src="https://material-you-slider.uiinitiative.com/images/05.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
