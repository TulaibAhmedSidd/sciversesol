// 'use client'
// import { useState, useEffect } from 'react';
// import styles from '../styles/Navbar2.module.css';
// import { useRouter } from 'next/navigation';
// import { useAppSelector } from '../store/store';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const router = useRouter();

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const updateCartCount = () => {
//     const cartItems: any = localStorage.getItem('cart');
//     const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
//     setCartCount(parsedCartItems.length);
//   };

//   // Update the cart count when the component mounts or cart changes
//   useEffect(() => {
//     updateCartCount();

//     // Optional: Listen for localStorage changes and update cart count dynamically
//     const handleStorageChange = () => updateCartCount();
//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const handleCartClick = () => {
//     // Redirect to cart page
//     router.push('/cart');
//   };

//   const handleScrollToSection = (section: any) => {
//     // Redirect to the root of the site first
//     window.location.href = '/';

//     // Use setTimeout to allow for page load and then scroll to the section
//     setTimeout(() => {
//       const element = document.getElementById(section);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 0); // Ensures the scroll happens after the page load
//   };

//   const { initialName } = useAppSelector(state => state?.example)

//   console.log("initialName", initialName);

//   return (
//     <header className={styles.header}>
//       <div className={styles.logo}>VOLTON SOLAR</div>
//       <button className={styles.menuToggle} onClick={toggleMenu}>
//         ☰
//       </button>
//       <nav className={styles.navbar}>
//         <ul className={isMenuOpen ? `${styles.navList} ${styles.show}` : styles.navList}>
//           <li><a href="#home" onClick={(e) => { e.preventDefault(); handleScrollToSection('home'); }}>Home</a></li>
//           <li><a href="#about" onClick={(e) => { e.preventDefault(); handleScrollToSection('about'); }}>About Us</a></li>
//           <li><a href="#services" onClick={(e) => { e.preventDefault(); handleScrollToSection('services'); }}>Services</a></li>
//           <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleScrollToSection('projects'); }}>Projects</a></li>
//           <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollToSection('contact'); }}>Contact</a></li>
//           <li><a href="#quote" onClick={(e) => { e.preventDefault(); handleScrollToSection('quote'); }} className={styles.cta}>Get a Quote</a></li>
//           <li><a href="/products">Products</a></li>
//           <li><a href="/plans">Plans</a></li>
//           <li className={styles.cartIcon} onClick={handleCartClick}>
//             🛒 <span className={styles.cartCount}>{cartCount}</span>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import styles from "../styles/Navbar2.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setwhatsAppNumber } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const router = useRouter();
  const [numbers, setNumbers] = useState([]);
  const dispatch = useDispatch();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const updateCartCount = () => {
    const cartItems: any = localStorage.getItem("cart");
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    setCartCount(parsedCartItems.length);
  };

  // Update the cart count when the component mounts or cart changes
  useEffect(() => {
    updateCartCount();

    // Optional: Listen for localStorage changes and update cart count dynamically
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    fetchNumbers();
  }, []);
  const fetchNumbers = async () => {
    try {
      const res = await fetch("/api/whatsApp");
      const data = await res.json();
      let primaryNumber = data?.find((item: any) => item?.makePrimary == true);

      dispatch(setwhatsAppNumber(primaryNumber?.WhatsAppNumber));
      setNumbers(data);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    } finally {
    }
  };
  const handleCartClick = () => {
    // Redirect to cart page
    router.push("/cart");
  };
  const pathname = usePathname(); // Get the current path using usePathname
  const adminRoute = pathname?.includes("admin");
  const contactRoute = pathname?.includes("contact");

  const handleScrollToSection = (section: any) => {
    // If the router is already on the root, don't trigger the scroll
    if (pathname !== "/") {
      // Redirect to the root of the site first
      window.location.href = "/";

      // Use setTimeout to allow for page load and then scroll to the section
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0); // Ensures the scroll happens after the page load
    }
  };

  const { whatsAppNumber } = useAppSelector((state) => state?.auth);

  // Handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Add class when scrolled
      } else {
        setIsScrolled(false); // Remove class when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const cartQuantity = useAppSelector((state) =>
  //   state.cart.items.reduce((total, item) => total + item.quantity, 0)
  // );

  const distinctItemsCount = useAppSelector((state) => state.cart.items.length);
  // let primaryNumber = numbers?.map((item: any) => item?.makePrimary == true);

  const handleWhatsAppRedirect = () => {
    const message = `Hello, I want a Quote`;

    // Encode the message and create the WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    // Set the WhatsApp link
    window.location.href = url;
  };
  return (
    <header
      className={`${styles.header} ${
        isMenuOpen || isScrolled || adminRoute || contactRoute
          ? styles.scrolled
          : ""
      }`}
    >
      <div
        className={styles.logo}
        onClick={() => {
          router.push("/");
        }}
      >
        <img
          src="/images/voltonLogo.png"
          alt="VOLTON SOLAR"
          className="logoCss"
        />
        {/* VOLTON SOLAR */}
      </div>
      <div
        className={styles.menuToggle}
        onClick={toggleMenu}
        style={{ marginRight: "-165px" }}
      >
        ☰
      </div>
      <nav
        className={styles.navbar}
        style={
          {
            // display: isMenuOpen ? "flex" : "none",
          }
        }
      >
        <ul
          className={
            isMenuOpen ? `${styles.navList} ${styles.show}` : styles.navList
          }
        >
          <li>
            <a
              href="#home"
              onClick={(e) => {
                router.push("/");
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                handleScrollToSection("about");
              }}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#services"
              onClick={(e) => {
                handleScrollToSection("services");
              }}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => {
                handleScrollToSection("projects");
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/contact"
              onClick={(e) => {
                // handleScrollToSection("contact");
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/plans">Plans</a>
          </li>
          <li className={styles.cartIcon} onClick={handleCartClick}>
            🛒 <span className={styles.cartCount}>{distinctItemsCount}</span>
          </li>
          <li
            style={{
              borderBottom: "1px solid transparent",
            }}
          >
            <a
              href="#quote"
              onClick={(e) => {
                handleWhatsAppRedirect();
              }}
              className={styles.cta}
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
