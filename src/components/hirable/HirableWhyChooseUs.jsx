import React from 'react';

const features = [
  '8+ Years of HR Excellence',
  'Virtual HR Solutions for Modern Businesses',
  'Cost-Effective HR Outsourcing',
  'Expert Remote HR Support',
];

const boxes = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 29" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 2.05566C3.87665 2.05566 1.75 4.18231 1.75 6.80566C1.75 9.42902 3.87665 11.5557 6.5 11.5557C9.12335 11.5557 11.25 9.42902 11.25 6.80566C11.25 4.18231 9.12335 2.05566 6.5 2.05566ZM0.25 6.80566C0.25 3.35388 3.04822 0.555664 6.5 0.555664C9.95178 0.555664 12.75 3.35388 12.75 6.80566C12.75 10.2574 9.95178 13.0557 6.5 13.0557C3.04822 13.0557 0.25 10.2574 0.25 6.80566Z" fill="currentColor"></path></svg>
    ),
    title: 'Virtual HR Consulting',
    desc: 'Get expert HR guidance remotely. Strategic consulting, policy development, and compliance support for your business.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 29" fill="none"><path d="M17 10.0999C18.1046 10.0999 19 9.20442 19 8.09985C19 6.99528 18.1046 6.09985 17 6.09985C15.8954 6.09985 15 6.99528 15 8.09985C15 9.20442 15.8954 10.0999 17 10.0999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 20.0999C9.55228 20.0999 10 19.6521 10 19.0999C10 18.5476 9.55228 18.0999 9 18.0999C8.44772 18.0999 8 18.5476 8 19.0999C8 19.6521 8.44772 20.0999 9 20.0999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 13.0999C10.1046 13.0999 11 12.2044 11 11.0999C11 9.99528 10.1046 9.09985 9 9.09985C7.89543 9.09985 7 9.99528 7 11.0999C7 12.2044 7.89543 13.0999 9 13.0999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    ),
    title: 'HR Compliance Assurance',
    desc: 'Stay compliant with all HR regulations. Expert guidance on labor laws, policies, and audit preparation.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 29" fill="none"><path d="M14 11.8108C21.1797 11.8108 27 9.57222 27 6.81079C27 4.04937 21.1797 1.81079 14 1.81079C6.8203 1.81079 1 4.04937 1 6.81079C1 9.57222 6.8203 11.8108 14 11.8108Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1 6.81079V22.8108C1 25.5708 6.82 27.8108 14 27.8108C21.18 27.8108 27 25.5708 27 22.8108V6.81079" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    ),
    title: 'Startup HR Solutions',
    desc: 'Tailored HR services for startups and SMEs. Build strong HR foundations with expert guidance and support.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 29" fill="none"><path d="M24.9997 3.59961L18.1797 10.4196" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 3.59961L9.82 10.4196" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 25.5993L9.82 18.7793" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M24.9997 25.5993L18.1797 18.7793" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14 27.5997C21.1797 27.5997 27 21.7794 27 14.5997C27 7.41991 21.1797 1.59961 14 1.59961C6.8203 1.59961 1 7.41991 1 14.5997C1 21.7794 6.8203 27.5997 14 27.5997Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    ),
    title: 'Remote HR Support',
    desc: 'Complete HR outsourcing for growing businesses. Handle all HR functions remotely with professional expertise.',
  },
];

export default function HirableWhyChooseUs({ openConsultationModal }) {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-white font-heading">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 px-4">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 text-[#7c5cff]">
            <span className="inline-block w-2 h-2 rounded-full bg-lime-300"></span>
            Why Choose Virtual HR
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-black">
            Transform your business with <span className="text-[#7c5cff]">Virtual HR Solutions</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-xl leading-relaxed">
            Get professional HR expertise without the overhead of a full-time HR team. Save up to 60% on HR costs while building a strong HR foundation for your business.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4 w-full mb-2">
            {features.map((f, i) => (
              <li key={f} className="flex items-center gap-3 text-sm md:text-base lg:text-lg text-gray-900 font-medium">
                <span className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#edeaff] text-[#7c5cff] flex-shrink-0">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Image with Play Button */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-sm md:max-w-md aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
            <img
              src="/Hirable – Human Resources & Recruiting WordPress Theme_files/about-img-2.jpg"
              alt="Virtual HR Services"
              className="w-full h-full object-cover"
            />
            <a
              href="https://www.youtube.com/embed/Y-x0efG1seA?feature=oembed?playlist=Y-x0efG1seA&mute=0&autoplay=1&loop=1&controls=0&start=0&end="
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center group"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-lime-200/90 shadow-lg transition-transform group-hover:scale-110">
                <svg width="24" height="24" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="none" /><polygon points="13,10 23,16 13,22" fill="#7c5cff" /></svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom: 4 Feature Boxes */}
      <div className="max-w-7xl mx-auto mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
        {boxes.map((box, i) => (
          <div key={box.title} className="bg-white rounded-2xl md:rounded-3xl border border-[#f0f0f5] p-6 md:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-4 md:mb-6 bg-[#edeaff] text-[#7c5cff] text-xl md:text-2xl">
              {box.icon}
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2 text-black">{box.title}</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">{box.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 