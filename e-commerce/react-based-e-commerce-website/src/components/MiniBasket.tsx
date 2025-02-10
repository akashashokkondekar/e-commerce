import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { removeItem, updateQuantity } from '../features/basket/basketSlice';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom'
import styles from './../css/MiniBasket.module.css';

const MiniBasket = () => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();

  const totalPrice = basketItems.reduce((acc, item) => acc + item.variants.edges[0].node.price.amount * item.quantity, 0);

  return (

    <div className={styles.container}>
      {
        basketItems.length > 0 && <h2 className={styles.header}>Your Basket</h2>
      }
      {basketItems.length === 0 ? (
        <p className={styles.empty}>Your basket is empty.</p>
      ) : (

        basketItems.map((currProductObj, index) => (
          <div key={currProductObj.id} className={styles.item}>
            <span className={styles.name}>{`${(index + 1)}. ${currProductObj.title}`}</span>
            <div className={styles.controls}>
              <button onClick={() => dispatch(updateQuantity({ id: currProductObj.id, quantity: currProductObj.quantity - 1 }))}>
                <Minus size={16} />
              </button>
              <span>{currProductObj.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ id: currProductObj.id, quantity: currProductObj.quantity + 1 }))}>
                <Plus size={16} />
              </button>
            </div>
            <span className={styles.price}> ${(currProductObj.variants.edges[0].node.price.amount * currProductObj.quantity).toFixed(2)}</span>
            <button onClick={() => dispatch(removeItem(currProductObj.id))} className={styles.removeBtn}>
              <X size={16} />
            </button>
          </div>
        ))
      )}
      <div className={styles.footer}>
        <span>Total: ${totalPrice.toFixed(2)}</span>
        <Link to={'/'}>
          <button className={styles.checkoutBtn}>Checkout</button>
        </Link>
      </div>
    </div>

  );
};

export default MiniBasket;