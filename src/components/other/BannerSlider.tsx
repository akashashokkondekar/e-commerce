import React from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./../../index.css";
// import { FifthSlideIntroLine, FirstSlideIntroLine, FourthSlideIntroLine, SecondSlideIntroLine, SixthSlideIntroLine, ThirdSlideIntroLine } from "../../utils/AppConstant";
import slide0 from './../../assets/slide0.mp4';
import slide1 from './../../assets/slide1.mp4';
import slide2 from './../../assets/slide2.mp4';
import slide3 from './../../assets/slide3.mp4';
import slide4 from './../../assets/slide4.mp4';
import slide5 from './../../assets/slide5.mp4';

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
          }, 3000);
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
      <div className="keen-slider__slide number-slide1">
        <video autoPlay loop muted>
          <source src={slide0} type="video/mp4" />
        </video>
      </div>
      <div className="keen-slider__slide number-slide2">
        <video autoPlay loop muted>
          <source src={slide1} type="video/mp4" />
        </video>
      </div>
      <div className="keen-slider__slide number-slide3">
        <video autoPlay loop muted>
          <source src={slide2} type="video/mp4" />
        </video>
      </div>
      <div className="keen-slider__slide number-slide4">
        <video autoPlay loop muted>
          <source src={slide3} type="video/mp4" />
        </video>
      </div>
      <div className="keen-slider__slide number-slide5">
        <video autoPlay loop muted>
          <source src={slide4} type="video/mp4" />
        </video>
      </div>
      <div className="keen-slider__slide number-slide6">
        <video autoPlay loop muted>
          <source src={slide5} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
export default BannerSlider