import React from 'react';
import Marquee from "react-fast-marquee";

import partner1 from '../assets/coursera.png';
import partner2 from '../assets/googleclass room.png';
import partner3 from '../assets/khan academy.png';
import partner4 from '../assets/edx.jpeg';
import partner5 from '../assets/microsoft.jpeg';
import partner6 from '../assets/udemy.jpeg';

const ClientLogosMarque = () => {
    return (
        <section className="py-10 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Trusted by Our Partners</h2>
            <Marquee
                speed={50}
                gradient={false}
                pauseOnHover={true}
            >
                {[partner1, partner2, partner3, partner4, partner5, partner6].map((logo, idx) => (
                    <div key={idx} className="mx-8 w-48 h-24 flex items-center justify-center">
                        <img src={logo} alt={`Partner logo ${idx + 1}`} className="object-contain h-full w-auto" />
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default ClientLogosMarque;
