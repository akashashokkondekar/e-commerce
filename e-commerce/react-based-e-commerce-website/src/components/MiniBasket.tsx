import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { removeItem, updateQuantity } from '../features/basket/basketSlice';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './../css/MiniBasket.module.css';
import { BasketEmptyInfoText, CheckoutButtonText, DecreaseProductQuntityOperationText, IncreaseProductQuntityOperationText, RemoveProductFromCartOperationText, YourBasketText } from '../utils/AppConstant';

interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
}

const MiniBasket: React.FC = () => {

  const basketItems = useSelector((state: RootState) => state.basket.items as BasketItem[]);
  const dispatch = useDispatch();

  const performUserClickOperation = (operationName: string, currProductObj: BasketItem) => {

    switch (operationName) {
      case IncreaseProductQuntityOperationText:
        dispatch(updateQuantity({ id: currProductObj.id, quantity: currProductObj.quantity + 1 }));
        break;

      case DecreaseProductQuntityOperationText:
        if (currProductObj.quantity === 1) {
          dispatch(removeItem(currProductObj.id));
        } else {
          dispatch(updateQuantity({ id: currProductObj.id, quantity: currProductObj.quantity - 1 }));
        }
        break;

      case RemoveProductFromCartOperationText:
        dispatch(removeItem(currProductObj.id));
        break;

      default:
        break;
    }
  };

  const totalPrice = basketItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      {basketItems.length > 0 && <h2 className={styles.header}>{YourBasketText}</h2>}
      {basketItems.length === 0 ? (
        <p className={styles.empty}>{BasketEmptyInfoText}</p>
      ) : (
        basketItems.map((item, index) => (
          <div key={item.id} className={styles.item}>
            <span className={styles.name}>{`${index + 1}. ${item.title}`}</span>
            <div className={styles.controls}>
              <button onClick={() => performUserClickOperation(DecreaseProductQuntityOperationText, item)}>
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => performUserClickOperation(IncreaseProductQuntityOperationText, item)}>
                <Plus size={16} />
              </button>
            </div>
            <span className={styles.price}>
              {item.currencyCode}
              {(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => performUserClickOperation(RemoveProductFromCartOperationText, item)}
              className={styles.removeBtn}
            >
              <X size={16} />
            </button>
          </div>
        ))
      )}
      {basketItems.length > 0 && (
        <div className={styles.footer}>
          <span>
            Total: {(basketItems[0].currencyCode)}
            {totalPrice.toFixed(2)}
          </span>
          <Link to={'/checkout'}>
            <button
              className={styles.checkoutBtn}>
              {CheckoutButtonText}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MiniBasket;
