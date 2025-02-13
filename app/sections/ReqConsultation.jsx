'use client'
import React from 'react'
import styles from "../styles/Home.module.css";
import { useAppSelector } from '../store/store';

const ReqConsultation = () => {
    const { whatsAppNumber } = useAppSelector((state) => state?.auth);

    const handleWhatsAppRedirect = () => {
        const message = `Hello, I want to know more about  Panels.`;

        // Encode the message and create the WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

        // Set the WhatsApp link
        window.location.href = url;
    };

    return (
        <section id="cta" className={styles.cta}>
            <p className="fancy-heading ">
                Ready to Go ? Start Saving Today!
            </p>
            <br />
            <br />

            <a
                href="#quote"
                className={styles.ctaButton}
                onClick={(e) => {
                    e.preventDefault();
                    handleWhatsAppRedirect();
                }}
            >
                Request a Free Consultation
            </a>
            <br />

        </section>
    )
}

export default ReqConsultation