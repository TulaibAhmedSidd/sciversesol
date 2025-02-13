// components/Services.js
import styles from '../styles/Service.module.css'; // Import the styles

const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <h2 className="fancy-heading">Our Expertise</h2>
      <div className={styles.serviceCards}>
        {/* Web & Mobile Development */}
        <div className={`${styles.card} ${styles.webMobile}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
          <h3>Web & Mobile Development</h3>
          <p>We build modern, scalable websites and mobile applications using cutting-edge technologies.</p>

        </div>

        {/* UI/UX Design */}
        <div className={`${styles.card} ${styles.uiux}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <h3>UI/UX Design</h3>
          <p>Crafting intuitive and visually stunning interfaces for websites, apps, and software products.</p>

        </div>

        {/* Graphics & Branding */}
        <div className={`${styles.card} ${styles.graphicsBranding}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <h3>Graphics & Branding</h3>
          <p>From logos to full brand identities, we create compelling visuals that define your business.</p>

        </div>

        {/* 3D Modeling & Interior Design */}
        <div className={`${styles.card} ${styles.threeDModeling}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <h3>3D Modeling & Interior Design</h3>
          <p>High-quality 3D models and interior visualizations for architects, designers, and businesses.</p>

        </div>

        {/* Software & AI Solutions */}
        <div className={`${styles.card} ${styles.softwareAI}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
          <h3>Software & AI Solutions</h3>
          <p>Innovative software solutions and AI-driven tools to automate and enhance your business operations.</p>

        </div>

        {/* Data Engineering & Analytics */}
        <div className={`${styles.card} ${styles.dataAnalytics}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
          <h3>Data Engineering & Analytics</h3>
          <p>Data-driven insights, predictive modeling, and analytics to optimize your business strategy.</p>

        </div>

        {/* E-commerce & SaaS Development */}
        <div className={`${styles.card} ${styles.ecommerceSaaS}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="700">
          <h3>E-commerce & SaaS Development</h3>
          <p>Developing robust, scalable e-commerce platforms and SaaS products tailored to your needs.</p>

        </div>

        {/* Cloud Computing & DevOps */}
        <div className={`${styles.card} ${styles.cloudDevOps}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
          <h3>Cloud Computing & DevOps</h3>
          <p>Cloud solutions, automation, and DevOps services to streamline your IT infrastructure.</p>

        </div>

        {/* Game Development */}
        <div className={`${styles.card} ${styles.gameDevelopment}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900">
          <h3>Game Development</h3>
          <p>Creating immersive and high-performance mobile and desktop games with the latest technologies.</p>

        </div>
      </div>
    </section>

  );
}
export default Services;
