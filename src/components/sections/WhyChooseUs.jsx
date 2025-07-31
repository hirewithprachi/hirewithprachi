import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ConsultationModal from '../../LeadCapturePreview';

const features = [
  {
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    title: "Cost-effective Solutions",
    description: "Get professional HR support at a fraction of the cost of maintaining an in-house team. Our flexible plans adapt to your budget."
  },
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: "Fast & Efficient Service",
    description: "Quick turnaround times for all HR needs, from recruitment to policy implementation. We understand time is crucial for business."
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: "Experienced HR Professional",
    description: "Led by Prachi Shrivastava, a certified POSH instructor and seasoned HR expert with extensive industry experience."
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: "Comprehensive Solutions",
    description: "From recruitment to compliance, get all your HR needs handled under one roof with our end-to-end services."
  }
];

const WhyChooseUs = () => {
  const [showConsultation, setShowConsultation] = useState(false);
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our professional virtual HR services, backed by expertise and driven by results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <button
            className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl hover:bg-primary/90 transition-all duration-300"
            onClick={() => setShowConsultation(true)}
          >
            Book a Free Consultation
          </button>
          <ConsultationModal open={showConsultation} onClose={() => setShowConsultation(false)} />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;