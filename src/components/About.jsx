import React from 'react';

const About = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left: Image */}
      <div className="relative flex justify-center">
        <img
          src="/images/services/generic-service.svg"
          alt="About HR Team"
          className="rounded-2xl shadow-2xl w-full max-w-md border-4 border-white dark:border-gray-800"
        />
        {/* Decorative badge */}
        <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 dark:from-pink-300 dark:via-pink-400 dark:to-pink-500 text-pink-900 dark:text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg text-lg border-4 border-white dark:border-gray-800">10+ Years Experience</div>
      </div>
      {/* Right: Text */}
      <div>
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-300 dark:via-pink-400 dark:to-pink-500">About Us</h3>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
          We’re a virtual HR agency focused on simplifying recruitment, compliance, and HR management. We help startups and small businesses build strong teams with flexible hiring strategies. Our experts bring years of experience to help you grow and stay compliant.
        </p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>✔️ Certified HR Professionals</li>
          <li>✔️ Startup & SME Specialists</li>
          <li>✔️ Personalized Approach</li>
          <li>✔️ Cost-effective Solutions</li>
        </ul>
      </div>
    </div>
  </section>
);

export default About;