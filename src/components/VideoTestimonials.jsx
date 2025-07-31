import React from 'react';
import { motion } from 'framer-motion';

const videos = [
  { src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', name: 'Client A' },
  { src: 'https://www.youtube.com/embed/oHg5SJYRHA0', name: 'Client B' },
];

export default function VideoTestimonials() {
  return (
    <section className="py-12 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Video Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, i) => (
          <motion.div
            key={video.name}
            className="rounded-2xl overflow-hidden shadow-lg bg-black"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <iframe
              width="100%"
              height="240"
              src={video.src}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="p-4 text-white text-center bg-gradient-to-r from-indigo-500 to-pink-400">{video.name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 