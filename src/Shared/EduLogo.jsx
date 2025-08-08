import React from 'react';
import logo from '../assets/edulogo.png'
import { Link } from 'react-router';

const EduLogo = () => {
    return (
       <Link to="/">
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 object-contain" // ✅ লোগোর সুন্দর সাইজ
          src={logo}
          alt="EduManage Logo"
        />
        <span className="text-xl font-bold text-primary hidden sm:inline">EduManage</span>
      </div>
    </Link>
    );
};

export default EduLogo;
