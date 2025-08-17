import React from 'react';
import EduLogo from '../Shared/EduLogo';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-content py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-6">
        {/* Left part: Logo and Text */}
        <aside className="flex flex-col items-center md:items-start text-center md:text-left">
          <EduLogo />
          <p className="font-bold mt-4 text-lg">
            EduManage Platform
            <br />
            Empowering Education & Learning Since 2023
          </p>
          <p className="mt-2 text-sm text-gray-300">
            &copy; {new Date().getFullYear()} - All rights reserved by EduManage
          </p>
        </aside>

        {/* Right part: Social Icons */}
        <nav>
          <div className="flex gap-4 justify-center mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle bg-blue-600 text-white hover:bg-blue-700"
            >
              <FaFacebook size={20} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle bg-sky-500 text-white hover:bg-sky-600"
            >
              <FaTwitter size={20} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle bg-blue-800 text-white hover:bg-blue-900"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle bg-gray-800 text-white hover:bg-black"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
