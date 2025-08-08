import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../assets/edu1.jpeg'
import bannerImg2 from '../../assets/edu2.jpg'

import bannerImg3 from '../../assets/edu3.avif'
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <Carousel autoPlay={true} showThumbs={false}>
            <div>
                <img src={bannerImg1} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={bannerImg2}  />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={bannerImg3} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Banner;