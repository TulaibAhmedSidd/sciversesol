// "use client";

// import { useState, useEffect } from "react";
// import styles from "@styles/Cart.module.css";

// export default function Cart() {
//   const [cart, setCart] = useState<any[]>([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCart(cartItems);
//     setTotal(cartItems.reduce((acc: any, item: any) => acc + item.price, 0));
//   }, []);

//   const proceedToWhatsApp = () => {
//     const message =
//       `I would like to purchase the following items:\n\n` +
//       cart.map((item) => `${item.name} - ${item.price} USD`).join("\n") +
//       `\n\nTotal: ${total} USD`;

//     const whatsappUrl = `https://wa.me/923052504520?text=${encodeURIComponent(
//       message
//     )}`;
//     window.location.href = whatsappUrl;
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <h1 className={styles.title}>Your Cart</h1>
//       <div className={styles.cartItems}>
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cart.map((item, index) => (
//             <div key={index} className={styles.cartItem}>
//               <div className={styles.cartItemDetails}>
//                 <h3>{item.name}</h3>
//                 <p className={styles.itemPrice}>{item.price} USD</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {cart.length > 0 && (
//         <div className={styles.total}>
//           <h2>Total: {total} USD</h2>
//           <button onClick={proceedToWhatsApp} className={styles.whatsappButton}>
//             Proceed to WhatsApp
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useSelector, useDispatch } from "react-redux";
import styles from "@styles/Cart.module.css";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";
import { useAppSelector } from "../store/store";
import { formatMoney } from "../utils/helperFunc";

export default function Cart() {
  const { whatsAppNumber } = useAppSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  const total = cart.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  );

  const proceedToWhatsApp = () => {
    const message =
      `I would like to purchase the following items:\n\n` +
      cart
        .map(
          (item: any) =>
            `${item.name} (x${item.quantity}) - ${
              item.price * item.quantity
            } PKR`
        )
        .join("\n") +
      `\n\nTotal: ${total} PKR`;

    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div className={styles.cartContainer}>
      <div className="bg_space_for_title">
        <h1 className={styles.title + " lightcolor"}>Your Cart</h1>
      </div>
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item: any) => (
            <div key={item._id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.cartItemDetails}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>
                  Rs. {formatMoney(item.price)} Pkr
                </p>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item._id))}>
                    +
                  </button>
                </div>
                <p>Total: Rs. {formatMoney(Number(item.price * item.quantity))} PKR</p>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className={styles.total}>
          <h2>Total: Rs. {formatMoney(total.toFixed(2))} PKR</h2>
          <button onClick={proceedToWhatsApp} className={styles.whatsappButton}>
            Proceed to WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
