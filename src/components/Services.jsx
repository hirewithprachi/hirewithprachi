import React from 'react';

const services = [
  {
    title: 'Recruitment & Hiring',
    icon: (
      <img src="https://img.icons8.com/fluency/48/000000/recruitment.png" alt="Recruitment" className="w-12 h-12 mx-auto" loading="lazy" />
    ),
    desc: 'Find top talent fast with customized hiring solutions.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Payroll & Compliance',
    icon: (
      <img src="https://img.icons8.com/fluency/48/000000/payroll.png" alt="Payroll" className="w-12 h-12 mx-auto" loading="lazy" />
    ),
    desc: 'Ensure smooth operations with legal HR frameworks.',
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Virtual HR Support',
    icon: (
      <img src="https://img.icons8.com/fluency/48/000000/online-support.png" alt="HR Support" className="w-12 h-12 mx-auto" loading="lazy" />
    ),
    desc: 'On-demand HR consulting for small & growing teams.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Employee Engagement',
    icon: (
      <img src="https://img.icons8.com/fluency/48/000000/teamwork.png" alt="Engagement" className="w-12 h-12 mx-auto" loading="lazy" />
    ),
    desc: 'Boost workplace culture and employee satisfaction.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

const Services = ({ services: propServices }) => {
  const servicesToShow = propServices && propServices.length > 0 ? propServices : services;
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-pink-400 dark:to-pink-500">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {servicesToShow.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center p-8 text-center group relative overflow-hidden"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600" style={{filter:'blur(8px)'}} />
              <div className="relative z-10">
                <div className="mb-4">{service.icon || service.icon_url ? (<img src={service.icon_url} alt="icon" className="w-12 h-12 mx-auto" loading="lazy" />) : null}</div>
                <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-pink-400 dark:to-pink-500">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.desc || service.description}</p>
                <img src={service.image || service.image_url} alt={service.title} className="rounded-xl w-full h-32 object-cover mb-2" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 