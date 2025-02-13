// import React from 'react'
// import styles from "../styles/Home.module.css";

// const OurWork = () => {
//     return (
//         <section id="projects" className={styles.projects}>
//             <h2 className="fancy-heading">Our Work in Action</h2>
//             <div className={styles.projectGallery}>
//                 <img
//                     src="/images/project1.jpg"
//                     alt="Solar Panel Installation Project 1"
//                 />
//                 <img
//                     src="/images/project2.jpg"
//                     alt="Solar Panel Installation Project 2"
//                 />
//                 <img
//                     src="/images/project3.jpg"
//                     alt="Solar Panel Installation Project 3"
//                 />
//                 <img
//                     src="/images/project4.jpg"
//                     alt="Solar Panel Installation Project 4"
//                 />
//             </div>
//         </section>
//     )
// }

// export default OurWork
import React from 'react';
import styles from "../styles/Home.module.css";

const OurWork = () => {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className="fancy-heading">Our Work in Action</h2>
      <div className={`${styles.projectGallery}`}>
        <div className={`${styles.projectCard}`} data-aos="fade-up" data-aos-duration="1000">
          <img
            src="/images/project1.jpg"
            alt="Solar Panel Installation Project 1"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className={`${styles.projectCard}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
          <img
            src="/images/project2.jpg"
            alt="Solar Panel Installation Project 2"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className={`${styles.projectCard}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <img
            src="/images/project3.jpg"
            alt="Solar Panel Installation Project 3"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className={`${styles.projectCard}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <img
            src="/images/project4.jpg"
            alt="Solar Panel Installation Project 4"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default OurWork;
