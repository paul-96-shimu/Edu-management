import React from 'react';

const partners = [
  {
    id: 1,
    logo: 'https://i.ibb.co/FkMxFkCV/coursera.png',
    name: 'Coursera',
    description: 'Coursera collaborates with us to offer certified online courses from top universities.',
  },
  {
    id: 2,
    logo: 'https://i.ibb.co/zHCfggKc/khan-academy.png',
    name: 'Khan Academy',
    description: 'Khan Academy provides us with high-quality, free learning materials.',
  },
  {
    id: 3,
    logo: 'https://i.ibb.co/1YHPnPPD/edx.jpg',
    name: 'edX',
    description: 'edX supports our platform with globally recognized academic content.',
  },
  {
    id: 4,
    logo: 'https://i.ibb.co/V0Hn67LY/udemy.jpg',
    name: 'Udemy',
    description: 'Udemy partners with us to deliver skill-based learning courses.',
  },
  {
    id: 5,
    logo: 'https://i.ibb.co/kVLC1SgG/googleclass-room.png',
    name: 'Google Classroom',
    description: 'Google Classroom helps manage student-teacher interactions and assignments.',
  },
  {
    id: 6,
    logo: 'https://i.ibb.co/W4Q9vJjq/microsoft.jpg',
    name: 'Microsoft Education',
    description: 'Microsoft supports our learning environment with tools like OneNote & Teams.',
  },
];

const PartnerSection = () => {
  return (
     <section className="my-16 px-4 md:px-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">Our Partners & Collaborators</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We proudly work with industry-leading educational platforms and technology providers who help us deliver quality learning experiences, innovative tools, and global reach.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.map(({ id, logo, name, description }) => (
          <div
            key={id}
            className="p-6 border rounded-lg shadow transition duration-300 bg-white hover:bg-blue-50 hover:shadow-xl text-center"
          >
            <img src={logo} alt="" className="mx-auto mb-4 max-h-20 object-contain rounded-full" />
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
        </section>
    );
  
};

export default PartnerSection;
