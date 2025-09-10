import React from 'react';
import { Award, Check } from 'lucide-react';

const AboutSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div>
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            About Prachi Shrivastava
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> HR Partner</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            With over 5 years of experience in human resources, I specialize in providing
            comprehensive virtual HR services to businesses of all sizes. My mission is to
            streamline your HR processes while ensuring compliance and fostering growth.
          </p>
          {/* Key Points */}
          <div className="space-y-4 mb-8">
            {[
              "Certified HR Professional with proven track record",
              "Specialized in startup and SME HR requirements",
              "Cost-effective alternative to in-house HR teams",
              "Personalized approach for every client"
            ].map((point, index) => (
              <div key={index} className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-purple-600">200+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            Book Free Consultation
          </button>
        </div>
        {/* Image */}
        <div className="relative">
          <img
            src="/images/services/generic-service.svg"
            alt="Prachi Shrivastava - HR Expert"
            className="rounded-2xl shadow-2xl w-full h-auto"
          />
          {/* Floating Achievement Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">HR Excellence</div>
                <div className="text-sm text-gray-600">Industry Recognition</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;