import React from 'react';
import { useQuery } from "@tanstack/react-query";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import UseAxios from '../../Hooks/UseAxios';
// import { useNavigate } from 'react-router';

const ApproveClass = () => {

  const axiosSecure = UseAxios();


  const {
    data: classes = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['popular-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('https://server-kappa-steel.vercel.app/popular-classes');
   
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  if (isLoading) return <p className="text-center py-10">⏳ Loading popular classes...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">❌ Failed to load data: {error.message}</p>;
  if (classes.length === 0) return <p className="text-center py-10 text-gray-500">😔 No popular classes found.</p>;

  return (
    <div className="my-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🔥 Popular Classes</h2>
      <Slider {...settings}>
        {classes.map(cls => (
          <div key={cls._id} className="p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={cls.image} alt={cls.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{cls.title}</h3>
                <p className="text-gray-600">Instructor: {cls.name}</p>
                <p className="text-green-600 font-bold">৳{cls.price}</p>
                <p className="text-sm text-gray-500">Enrollments: {cls.totalEnrollment || 0}</p>

         
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ApproveClass;
