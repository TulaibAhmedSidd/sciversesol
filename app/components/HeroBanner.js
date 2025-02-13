"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../styles/HeroBanner.module.css";

const HeroBanner = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    "Powering a Brighter Future with  Energy!",
    "Sustainable, Reliable, and Cost-Effective Energy Solutions for Homes and Businesses.",
    "Join the Green Energy Revolution with Sciverse !",
    "Reduce Your Carbon Footprint, One Panel at a Time.",
    "Efficient  Solutions, Tailored to Your Needs.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleWhatsAppRedirect = () => {
    const message = `Hello, I want to know more about  Panels.`;

    // Encode the message and create the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/923032115055?text=${encodedMessage}`;

    // Set the WhatsApp link
    window.location.href = url;
  };

  const videoRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.hero}>
      <video
        ref={videoRef}
        preload="none"
        poster="/images/bgdark.png"
        className={styles.heroVideo}
        autoPlay
        loop
        muted
      >
        <source src="/video/-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.heroContent}>
        <h1>{texts[currentText]}</h1>
        <div className={styles.heroButtons}>
          <a
            href="#get-started"
            className={styles.getStarted}
            onClick={(e) => {
              e.preventDefault();
              handleWhatsAppRedirect();
            }}
          >
            Chat with us
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
