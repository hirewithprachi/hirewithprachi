// Add this at the top of the file
// To enable contact form submissions, update the handleSubmit logic to POST to Formspree or EmailJS for production use.
// Example for Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: ... })
import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast';
import { addContactToHubSpot } from '../../lib/hubspot';

export default function ContactForm() {
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        workRequired: '',
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!formData.name || !formData.email || !formData.workRequired) {
          toast({
            title: 'Please fill in all required fields',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
        // For production: POST to Formspree
        fetch('https://formspree.io/f/manbjlrj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        // Also send to HubSpot CRM
        const [firstname, ...rest] = formData.name.split(' ');
        const lastname = rest.join(' ');
        await addContactToHubSpot({ email: formData.email, firstname, lastname });
        toast({
          title: 'Thank you! We will contact you soon.',
          variant: 'success',
        });
        setFormData({ name: '', email: '', location: '', workRequired: '' });
        setIsSubmitting(false);
      };

      return (
    <section className="py-20 font-heading bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-16 max-w-6xl">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="https://demo.awaikenthemes.com/hirable/wp-content/uploads/2025/04/about-img-1.jpg"
            alt="Contact Hirable"
            className="rounded-3xl shadow-2xl border-4 border-primary max-w-md w-full object-cover"
            style={{ minHeight: 320 }}
          />
        </div>
        {/* Right: Form */}
        <div className="w-full md:w-1/2 bg-white rounded-3xl shadow-xl border border-gray-100 p-10 flex flex-col items-start">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Contact Us</h2>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div>
              <label className="block text-neutral font-medium mb-2">Name*</label>
              <input
                type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-lg"
                    required
                  />
                </div>
                <div>
              <label className="block text-neutral font-medium mb-2">Email*</label>
              <input
                type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-lg"
                    required
                  />
                </div>
                <div>
              <label className="block text-neutral font-medium mb-2">Location</label>
              <input
                type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-lg"
                    />
                </div>
                <div>
              <label className="block text-neutral font-medium mb-2">Work Required*</label>
              <textarea
                    name="workRequired"
                    value={formData.workRequired}
                    onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-lg min-h-[100px]"
                    required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:scale-105 hover:bg-secondary transition-transform duration-300 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
          </div>
        </section>
      );
}