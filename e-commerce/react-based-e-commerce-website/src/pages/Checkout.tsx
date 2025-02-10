import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import styles from './../css/Checkout.module.css';
import NavBar from '../components/NavBar';

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.basket.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.variants.edges[0].node.price.amount * item.quantity, 0);

  return (
    <div>
      <NavBar />
      <div className={styles.checkoutContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.header}>Checkout</h1>
          <form className={styles.form}>
            <label className={styles.label}>Name
              <input type="text" className={styles.input} placeholder="Enter your name" required />
            </label>
            <label className={styles.label}>Email
              <input type="email" className={styles.input} placeholder="Enter your email" required />
            </label>
            <label className={styles.label}>Address
              <input type="text" className={styles.input} placeholder="Enter your address" required />
            </label>
            <button type="submit" className={styles.submitButton}>Place Order</button>
          </form>
        </div>

        <div className={styles.cartSection}>
          <h2 className={styles.cartHeader}>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>No items in cart.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <span className={styles.itemName}>{item.title} x{item.quantity}</span>
                <span className={styles.itemPrice}>${(item.variants.edges[0].node.price.amount * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
          <div className={styles.totalSection}>
            <span>Total:</span>
            <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;