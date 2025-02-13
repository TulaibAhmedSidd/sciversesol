"use client";
import { useState } from "react";
import styles from "../styles/PlanCard.module.css";
import { useAppSelector } from "../store/store";

export default function PlanCard({ plan }) {
  const { whatsAppNumber } = useAppSelector((state) => state?.auth);

  // Function to generate WhatsApp message
  const handleWhatsAppRedirect = () => {
    const message = `Hello, I am interested in your ${plan.name} plan. 
      Here are the details:
      - Price: $${plan.totalPrice}
      - Equipment: ${plan.equipment
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ")}
      - Appliances: ${plan?.applianceSetup?.map(
        (item) => item?.count + " " + item?.appliance
      ).join(", ")} `;

    // Encode the message and create the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    // Set the WhatsApp link
    // setWhatsappLink(url);
    window.location.href = url;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.planTitle}>{plan.name}</h2>
      <p className={styles.planDescription}>{plan.description}</p>
      <h3 className={styles.planPrice}>Price: Rs. {plan.totalPrice}</h3>

      <div className={styles.equipment}>
        <h4 className={styles.sectionTitle}>Included Equipment:</h4>
        <ul>
          {plan.equipment.map((item, index) => (
            <li key={index}>
              {item.name} x{item.quantity} - Rs. {item.price}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.applianceSetup}>
        <h4 className={styles.sectionTitle}>Can Power:</h4>
        <ul>
          {plan?.applianceSetup?.map((item, ind) => (
            <li key={ind} className=" capitalize">
              {item?.count} {item?.appliance}
            </li>
          ))}
        </ul>
      </div>

      <button className={styles.quoteButton} onClick={handleWhatsAppRedirect}>
        Proceed to WhatsApp
      </button>

      {/* Conditionally render the WhatsApp link */}
      {/* {whatsappLink && (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <button className={styles.whatsappButton}>Chat on WhatsApp</button>
        </a>
      )} */}
    </div>
  );
}
