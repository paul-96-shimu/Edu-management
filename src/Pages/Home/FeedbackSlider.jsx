import { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('https://server-kappa-steel.vercel.app/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("❌ Feedback load error:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Teachers Say</h2>
      <Slider {...settings}>
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="p-4">
            <div className="bg-white shadow-md rounded-xl p-6 h-full flex flex-col justify-between">
              <p className="text-gray-700 mb-4">"{feedback.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={feedback.userPhoto}
                  alt={feedback.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{feedback.userName}</p>
                  <p className="text-sm text-gray-500">{feedback.classTitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeedbackSlider;
