import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Contact Information */}
        <div className={styles.contact}>
          <h4>Contact Us</h4>


          <p>Address: R-13, Gulshan e Iqbal, Karachi</p>
          <p>Phone 1: +92 305 2504520</p>
          <p>Phone 2: +92 342 2473270</p>
          <p>Phone 3: +92 335 9151590</p>
          <p>Phone 3: +92 348 1333766</p>
          <p>Phone 3: +92 332 8238048</p>
          <p>Phone 3: +92 335 2614032</p>
          <p>Email: <a href="mailto:ahsidtullu@gmail.com">Sciverse@gmail.com</a></p>
        </div>

        {/* Navigation Links */}
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
        </div>

        {/* Newsletter Subscription */}
        <div className={styles.newsletter}>
          <h4>Stay Updated</h4>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Subscribe to newsletter"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>&copy; 2022 Sciverse . All rights reserved.</p>
      </div>
    </footer>
  );
}
