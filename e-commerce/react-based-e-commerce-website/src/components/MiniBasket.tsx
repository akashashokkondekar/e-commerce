import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './../app/store';
import { removeItem, updateQuantity } from '../features/basket/basketSlice';
import styles from './../css/MiniBasket.module.css';

const MiniBasket = () => {

  const basketItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();

  const totalPrice = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.miniBasket}>
      <div className={styles.miniBasketHeader}>
        <span>Mini Basket</span>
      </div>

      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        basketItems.map((item) => (
          <div key={item.id} className={styles.miniBasketItem}>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>{item.title}</span>
              <div className={styles.itemPrice}>${item.price}</div>
            </div>

            <div className={styles.itemQuantity}>
              <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
            </div>

            <button className={styles.removeButton} onClick={() => dispatch(removeItem(item.id))}>
              Remove
            </button>
          </div>
        ))
      )}

      <div className={styles.totalPrice}>Total: ${totalPrice}</div>
    </div>
  );
};

export default MiniBasket;
