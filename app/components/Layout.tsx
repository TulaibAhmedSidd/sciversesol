"use client";
import React from "react";
import AOS from "aos"; // Import AOS JS
import 'aos/dist/aos.css'; // Import AOS CSS

export default function Layout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: "ease-in-out", // Easing effect
      // once: true, // Only trigger animation once
    });
  }, []);

  return <div>{children}</div>;
}
