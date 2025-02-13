// components/Services.js

import styles from '../styles/Service.module.css'; // Import the styles

const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <h2 className="fancy-heading">Our Expertise</h2>
      <div className={styles.serviceCards}>
        <div
          className={styles.card}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <h3>Solar Panel Installation</h3>
          <p>
            We offer efficient and high-performance solar panel installation
            services.
          </p>
          <a href="#learn-more">Learn More</a>
        </div>
        <div
          className={styles.card}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <h3>Inverter Sales and Maintenance</h3>
          <p>
            We sell and maintain top-quality solar inverters to optimize
            energy production.
          </p>
          <a href="#learn-more">Learn More</a>
        </div>
        <div
          className={styles.card}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <h3>Energy Audit and Consultation</h3>
          <p>
            Get expert advice to reduce energy costs and improve efficiency
            with solar solutions.
          </p>
          <a href="#learn-more">Learn More</a>
        </div>
        <div
          className={styles.card}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <h3>Custom Solar Solutions</h3>
          <p>
            Customized solar energy systems tailored to your specific needs
            and goals.
          </p>
          <a href="#learn-more">Learn More</a>
        </div>
      </div>
    </section>
    // <section id="services" className={styles.services}>
    //   <h2 className="fancy-heading">Our Expertise</h2>
    //   <div className={styles.serviceCards}>
    //     <div className={styles.card}>
    //       <h3>Solar Panel Installation</h3>
    //       <p>
    //         We offer efficient and high-performance solar panel installation
    //         services.
    //       </p>
    //       <a href="#learn-more">Learn More</a>
    //     </div>
    //     <div className={styles.card}>
    //       <h3>Inverter Sales and Maintenance</h3>
    //       <p>
    //         We sell and maintain top-quality solar inverters to optimize
    //         energy production.
    //       </p>
    //       <a href="#learn-more">Learn More</a>
    //     </div>
    //     <div className={styles.card}>
    //       <h3>Energy Audit and Consultation</h3>
    //       <p>
    //         Get expert advice to reduce energy costs and improve efficiency
    //         with solar solutions.
    //       </p>
    //       <a href="#learn-more">Learn More</a>
    //     </div>
    //     <div className={styles.card}>
    //       <h3>Custom Solar Solutions</h3>
    //       <p>
    //         Customized solar energy systems tailored to your specific needs
    //         and goals.
    //       </p>
    //       <a href="#learn-more">Learn More</a>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Services;
