// import styles from '../styles/Home.module.css'; // Import the styles
// import React from 'react'

// const WhoWe = () => {
//     return (
//         // <section id="about" className={styles.about}>
//         //     <h2 className="fancy-heading">Who We Are</h2>
//         //     <p>
//         //       We are committed to providing innovative, reliable, and sustainable
//         //       solar energy solutions for residential and commercial properties. Our
//         //       team of experts ensures the best service, from consultation to
//         //       installation and beyond.
//         //     </p>
//         //     <img src="/images/team.jpg" alt="Our Team" />
//         //   </section>
//         // About Section in React (Next.js)
//         <section id="about" className="w-full bg-gray-100 py-20">
//             <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
//                 {/* Text Section */}
//                 <div className="w-full md:w-1/2">
//                     <h2 className="fancy-heading">Who we are</h2>

//                     <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-1s">
//                         We are committed to providing innovative, reliable, and sustainable
//                         solar energy solutions for residential and commercial properties. Our
//                         team of experts ensures the best service, from consultation to
//                         installation and beyond.
//                     </p>
//                     <a
//                         href="#learn-more"
//                         className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 animate__animated animate__fadeIn animate__delay-2s"
//                     >
//                         Learn More
//                     </a>
//                 </div>

//                 {/* Image Section */}
//                 <div className="w-full md:w-1/2">
//                     <img
//                         src="/images/team.jpg"
//                         alt="Our Team"
//                         className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
//                     />
//                 </div>
//             </div>
//         </section>

//     )
// }

// export default WhoWe


// page.tsx
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        {/* Text Section */}
        <div className="w-full md:w-1/2" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We are committed to providing innovative, reliable, and sustainable
            solar energy solutions for residential and commercial properties. Our
            team of experts ensures the best service, from consultation to
            installation and beyond.
          </p>
          <a
            href="#learn-more"
            className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2" data-aos="fade-up" data-aos-delay="200">
          <img
            src="/images/team.jpg"
            alt="Our Team"
            className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
