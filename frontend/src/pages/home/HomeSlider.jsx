import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../home/homeSlider.css';

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="homeSliderContainer">
      <div className="containerxxxxxxxx">
        <Slider {...settings}>
        <div>
            <img src="/images/slider6.jpg" alt="Watch 3" />
          </div>
          <div>
            <img src="/images/slide2.png" alt="Watch 2" />
          </div>
          <div>
            <img src="/images/slide04.jpg" alt="Watch 3" />
          </div>
          <div>
            <img src="/images/slide5.png" alt="Watch 3" />
          </div>
       
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;

