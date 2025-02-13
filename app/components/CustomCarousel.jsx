"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/CustomCarousel.module.css";

const CustomCarousel = () => {
    const slides = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEFCnj_pxbEdCTNBT8Ag_520MMAoK6NpJ_w&s",
            title: "Custom Software Solutions",
            description:
                "We build innovative and scalable software solutions tailored to meet your business needs, from concept to execution.",
            link: "/services/software-development/",
        },
        {
            image: "https://www.addevice.io/storage/ckeditor/uploads/images/65f840d316353_mobile.app.development.1920.1080.png",
            title: "Mobile App Development",
            description:
                "Developing cutting-edge mobile applications for iOS and Android to enhance user experience and boost your business.",
            link: "/services/mobile-app-development/",
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT77yoi7wxlsG9dJsqOo9e6SNbDcH7lF_GmAA&s",
            title: "AI & Machine Learning",
            description:
                "Leverage AI-driven tools and machine learning algorithms to optimize your business processes and gain actionable insights.",
            link: "/services/ai-machine-learning/",
        },
        {
            image: "https://media.licdn.com/dms/image/v2/C4D12AQE39vlgcO7LJw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1634011708493?e=2147483647&v=beta&t=bzJfgxQ4ierAN0F2yOwNhQ2Njm1AQ4-w8gN7IML5fxk",
            title: "Cloud Computing & DevOps",
            description:
                "Building cloud infrastructure and DevOps services that ensure smooth, scalable, and efficient software deployment and management.",
            link: "/services/cloud-computing-devops/",
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
            <div
                className={styles.carousel}
                style={{
                    backgroundPosition: `center ${scrollPosition * 0.5}px`, // Adjust parallax speed
                }}
            >
                <div
                    className={styles.slides}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div className={styles.slide} key={index}>
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className={styles.slideImage}
                                data-aos="fade-zoom-in" // AOS animation for images
                            />
                            <div
                                className={`${styles.caption} ${isAnimating ? styles.captionAnimation : ""}`}
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
                            className={`${styles.indicator} ${currentSlide === index ? styles.active : ""}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>

        // <section id="carousel">
        //     <div className={styles.carousel}
        //         style={{
        //             backgroundPosition: `center ${scrollPosition * 0.5}px`, // Adjust parallax speed
        //         }}>
        //         <div
        //             className={styles.slides}
        //             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        //         >
        //             {slides.map((slide, index) => (
        //                 <div className={styles.slide} key={index} content=""
        //                 >
        //                     <img
        //                         src={slide.image}
        //                         alt={slide.title}
        //                         className={styles.slideImage}
        //                         data-aos="fade-zoom-in" // AOS animation for images

        //                     />
        //                     <div
        //                         className={`${styles.caption} ${isAnimating ? styles.captionAnimation : ""
        //                             }`} // Add animation class
        //                         id={slide.title}
        //                     >
        //                         <h2>{slide.title}</h2>
        //                         <p>{slide.description}</p>
        //                         <a href={slide.link} className={styles.learnMore}>
        //                             Learn More
        //                         </a>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //         <div className={styles.indicators}>
        //             {slides.map((_, index) => (
        //                 <button
        //                     key={index}
        //                     onClick={() => handleSlideChange(index)}
        //                     className={`${styles.indicator} ${currentSlide === index ? styles.active : ""
        //                         }`}
        //                 ></button>
        //             ))}
        //         </div>
        //     </div>
        // </section>
    );
};

export default CustomCarousel;
