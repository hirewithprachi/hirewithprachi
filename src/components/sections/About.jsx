import React from 'react';

export default function About() {
  return (
    <section className="py-20 font-heading bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-16 max-w-6xl">
        {/* Photo */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/about-img-1.jpg"
            alt="About Hirable"
            className="rounded-3xl shadow-2xl border-4 border-primary max-w-md w-full object-cover"
            style={{ minHeight: 320 }}
          />
        </div>
        {/* Info Card */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
          <h3 className="text-lg md:text-xl font-semibold text-accent mb-2 tracking-widest uppercase">About Hirable</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Empowering Careers, Transforming Businesses</h2>
          <p className="text-lg md:text-xl text-neutral mb-6 font-medium">We deliver expert HR solutions, connecting talent with opportunity and ensuring business success with personalized support. Our team brings years of experience and a passion for people.</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-base md:text-lg text-neutral font-medium">
              <svg className="text-accent w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
              Trusted by 245+ clients
            </li>
            <li className="flex items-center gap-2 text-base md:text-lg text-neutral font-medium">
              <svg className="text-accent w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
              98% client satisfaction
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}