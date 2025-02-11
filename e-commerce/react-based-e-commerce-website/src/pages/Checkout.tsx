import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import styles from './../css/Checkout.module.css';
import NavBar from '../components/NavBar';
import { CartEmptyInfoText, PlaceOrderText, YourCartText } from '../utils/AppConstant';

interface BasketItem {
  id: string;
  title: string;
  quantity: number;
  variants: {
    edges: {
      node: {
        price: {
          amount: number;
        };
      };
    }[];
  };
}

const Checkout: React.FC = () => {
  
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const totalPrice = basketItems.reduce((acc: number, item: BasketItem) => acc + item.variants.edges[0].node.price.amount * item.quantity, 0);

  return (
    <div>
      <NavBar basketItems={basketItems} />
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
            <button type="submit" className={styles.submitButton}>{PlaceOrderText}</button>
          </form>
        </div>

        <div className={styles.cartSection}>
          <h2 className={styles.cartHeader}>{YourCartText}</h2>
          {basketItems.length === 0 ? (
            <p className={styles.emptyCart}>{CartEmptyInfoText}</p>
          ) : (
            basketItems.map((item: BasketItem) => (
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
