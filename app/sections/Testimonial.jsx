'use client'
import React, { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css";
import axios from 'axios';
import Loading from '../components/Loading';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/testimonial", {
                // headers: { "x-is-admin": isAdmin.toString() }, // Admin or user view
            });
            let approvedTesti = response?.data?.filter((item) => item?.approved == true)
            setTestimonials(approvedTesti);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section id="testimonials" className={styles.testimonials}>
            <h2 className="fancy-heading" data-aos="fade-up">
                What Our Clients Say
            </h2>
            <br />
            <br />
            <br />
            <div className={styles.testimonialSlider}>
                {
                    loading ?
                        <Loading />
                        : testimonials?.map((testimonial, index) => (
                            <div
                                className={styles.testimonial}
                                key={index}
                                data-aos="fade-right"
                                data-aos-delay={`${index * 200}`}
                            >
                                <p>{testimonial?.text}</p>
                                <span>- {testimonial?.author}</span>
                            </div>
                        ))}
            </div>
        </section>
    )
}

export default Testimonial