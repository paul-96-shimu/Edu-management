import React from 'react';
import { Outlet } from 'react-router';
// import authimg from '../assets/authImage.png'
import Lottie from 'lottie-react';
import singinLottie from '../assets/loities/singin.json'


import EduLogo from '../Shared/EduLogo';

const AuthLayouts = () => {
    return (
       <div className=" bg-base-200  container mx-auto py-12 p-12">
      <EduLogo></EduLogo>
  <div className="hero-content flex-col lg:flex-row-reverse ">
  <div className='flex-1 s'>
    
      <Lottie animationData={singinLottie} loop={true} />
  </div>
    <div  className="flex-1 ">
     <Outlet></Outlet>
    </div>
  </div>
</div>
    );
};

export default AuthLayouts;