"use client";

// components/Button.js
// components/Button.tsx
import React from "react";
import styles from "@styles/Button.module.css";

// Define the props interface for the Button component
interface ButtonProps {
  variant?: "filled" | "outlined"; // Variant can be filled or outlined
  size?: "small" | "medium" | "large"; // Button size
  children: React.ReactNode; // The content inside the button (text, icons, etc.)
  onClick?: () => void; // Optional onClick handler
  disabled?: boolean; // Optional disabled state
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  size = "medium",
  children,
  onClick = () => {},
  disabled = false,
  className,
  type = "button",
}) => {
  // Construct dynamic class names for the button based on props
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]}`;

  return (
    <button
      className={buttonClass + " " + className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

// usage

// pages/index.js
// import Button from '../components/Button';

// export default function Home() {
//   const handleClick = () => {
//     alert('Button clicked!');
//   };

//   return (
//     <div>
//       <h1>Welcome to Volton Solar!</h1>

//       <Button variant="filled" size="large" onClick={handleClick}>
//         Get Started
//       </Button>

//       <Button variant="outlined" size="medium" onClick={handleClick}>
//         Learn More
//       </Button>

//       <Button variant="filled" size="small" onClick={handleClick}>
//         Contact Us
//       </Button>
//     </div>
//   );
// }
