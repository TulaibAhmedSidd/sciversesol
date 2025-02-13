"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/CustomCarousel.module.css";

const CustomCarousel = () => {
    const slides = [
        {
            image: "https://s3.amazonaws.com/se-website-assets/img-v5/banner5.jpg",
            title: "A Solar Solution for All Markets Across The Globe",
            description:
                "We provide uninterrupted solar power to homes and businesses, tackling load-shedding while reducing energy costs.",
            link: "/contact/",
        },
        {
            image: "https://s3.amazonaws.com/se-website-assets/img-v5/banner3.jpg",
            title: "Solar Installation Services",
            description:
                "Professional installation of solar panels, inverters, and batteries tailored to your specific needs.",
            link: "/services/installation/",
        },
        {
            image: "https://s3.amazonaws.com/se-website-assets/img-v5/banner2.jpg",
            title: "24/7 Online Consultation",
            description:
                "Our experts are available round the clock to assist with your solar energy queries and provide customized solutions.",
            link: "/consultation/",
        },
        {
            image: "https://s3.amazonaws.com/se-website-assets/img-v5/banner1.jpg",
            title: "Solar Product Sales",
            description:
                "Explore our range of high-quality solar panels, inverters, batteries, and other solar accessories.",
            link: "/products/",
        },
    ];
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true); // Trigger animation
            setTimeout(() => {
                setIsAnimating(false); // Reset animation
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 300); // Ma
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY); // Get current scroll position
    };
    const handleSlideChange = (nextSlide) => {
        setIsAnimating(true); // Trigger animation
        setTimeout(() => {
            setIsAnimating(false); // Reset animation
            setCurrentSlide(nextSlide); // Change slide
        }, 300); // Match this duration with the CSS animation time
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="carousel">
            <div className={styles.carousel}
                style={{
                    backgroundPosition: `center ${scrollPosition * 0.5}px`, // Adjust parallax speed
                }}>
                <div
                    className={styles.slides}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div className={styles.slide} key={index} content=""
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className={styles.slideImage}
                                data-aos="fade-zoom-in" // AOS animation for images

                            />
                            <div
                                className={`${styles.caption} ${isAnimating ? styles.captionAnimation : ""
                                    }`} // Add animation class
                                // className={`${styles.caption} `} // Add animation class
                                // data-aos="fade-up" // AOS animation for text
                                // data-aos-delay="300" // Delay for smoother animations
                                id={slide.title}
                            >
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                                <a href={slide.link} className={styles.learnMore}>
                                    Learn More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.indicators}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlideChange(index)}
                            className={`${styles.indicator} ${currentSlide === index ? styles.active : ""
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomCarousel;
