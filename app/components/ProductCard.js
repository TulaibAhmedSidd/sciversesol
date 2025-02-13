"use client";

// import styles from '@styles/ProductCard.module.css';

// export default function ProductCard({ product, addToCart }) {
//   return (
//     <div className={styles.productCard}>
//       <h3>{product?.name}</h3>
//       <p>{product?.brand} | {product?.wattage} | {product?.size} | {product?.price} USD</p>
//       <button onClick={() => addToCart(product)}>Add to Cart</button>
//     </div>
//   );
// }

// components/ProductCard.tsx
"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../store/slices/cartSlice";
import styles from "@styles/ProductCard.module.css";
import { formatMoney } from "../utils/helperFunc";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  // Get the quantity of this product from the cart
  const cartItem = useSelector((state) => state.cart.items) || []; 
  console.log("cartItem",cartItem)
  const itemInCart = cartItem?.find((item) => item._id === product._id);
  console.log("itemInCart",itemInCart)
  const productQuantity = itemInCart ? itemInCart?.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    if (productQuantity > 1) {
      dispatch(decrementQuantity(product._id));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <h3 className="capitalize">{product.name}</h3>
      <p className="capitalize font-bold italic">{product.brand?.name}</p>
      <p className="capitalize">
        {product.size ? product.size : ""}
        {product.wattage ? " | " + product.wattage : ""}
      </p>
      <p className={styles.price + " capitalize"}>Rs. {formatMoney(product.price)}</p>

      {/* Add and Remove Buttons with Quantity Display */}
      <div className={styles.cartControls}>
        <button
          onClick={handleRemoveFromCart}
          disabled={productQuantity === 0}
          className={styles.removeButton}
        >
          -
        </button>
        <span className={styles.quantity}>{productQuantity}</span>
        <button onClick={handleAddToCart} className={styles.addButton}>
          +
        </button>
      </div>
    </div>
  );
}
