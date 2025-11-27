// page.tsx
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        {/* Text Section */}
        <div className="w-full md:w-1/2" data-aos="fade-up">
          <h2 className="fancy-heading" data-aos="fade-up">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At TAS Servies, we specialize in delivering innovative, scalable, and high-performance software solutions tailored to your unique needs. From cutting-edge web and mobile applications to powerful backend systems, we transform ideas into reality with expertise and precision.          </p>

        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2" data-aos="fade-up" data-aos-delay="200">
          <img
            src="/images/team.jpg"
            alt="Our Team"
            className="rounded-lg transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
