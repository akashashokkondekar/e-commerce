import React from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./../index.css";
import { FifthSlideIntroLine, FirstSlideIntroLine, FourthSlideIntroLine, SecondSlideIntroLine, SixthSlideIntroLine, ThirdSlideIntroLine } from "../utils/AppConstant";

const BannerSlider: React.FC = () => {

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (

    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">{FirstSlideIntroLine}</div>
      <div className="keen-slider__slide number-slide2">{SecondSlideIntroLine}</div>
      <div className="keen-slider__slide number-slide3">{ThirdSlideIntroLine}</div>
      <div className="keen-slider__slide number-slide4">{FourthSlideIntroLine}</div>
      <div className="keen-slider__slide number-slide5">{FifthSlideIntroLine}</div>
      <div className="keen-slider__slide number-slide6">{SixthSlideIntroLine}</div>
    </div>
  );
}
export default BannerSlider