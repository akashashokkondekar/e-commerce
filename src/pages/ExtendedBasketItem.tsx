import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../src/app/store';
import { removeItem, updateQuantity } from './../features/basket/basketSlice';
import { Link, useNavigate } from 'react-router-dom';
import styles from './../css/ExtendedBasketItem.module.css';
import { BasketItem } from './../types/Interface';
import { OperationTypeEnum, CheckoutButtonText, YourBasketText, TotalPriceText } from './../utils/AppConstant';
import BasketItemComponent from './../components/minibasket/BasketItem';
import NavBar from '../components/navbar/NavBar';
import { useEffect } from 'react';

const ExtendedBasketItem: React.FC = () => {

  const basketItems = useSelector((state: RootState) => state.basket.items as BasketItem[]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (basketItems.length === 0) {
      navigate("/");
    }
  });

  const performUserClickOperation = (operationType: number, currProductObj: BasketItem) => {
    switch (operationType) {
      case OperationTypeEnum.Increase_Product_Quantity:
        dispatch(updateQuantity({ id: currProductObj.id, quantity: currProductObj.quantity + 1 }));
        break;
      case OperationTypeEnum.Decrease_Product_Quantity:
        if (currProductObj.quantity === 1) {
          dispatch(removeItem(currProductObj.id));
        } else {
          dispatch(updateQuantity({ id: currProductObj.id, quantity: currProductObj.quantity - 1 }));
        }
        break;
      case OperationTypeEnum.Remove_Product:
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
      <NavBar basketItems={basketItems}></NavBar>
      <h2 className={styles.header}>{YourBasketText}</h2>
      <div className={styles.itemsContainer}>
        {basketItems.map((item, index) => (
          <BasketItemComponent
            key={item.id}
            item={item}
            index={index}
            performUserClickOperation={performUserClickOperation}
          />
        ))}
      </div>

      <div className={styles.checkoutSection}>
        <div className={styles.total}>
          {TotalPriceText} {basketItems[0]?.currencyCode}
          {totalPrice.toFixed(2)}
        </div>
        <Link to="/checkout">
          <button className={styles.checkoutButton}>{CheckoutButtonText}</button>
        </Link>
      </div>

    </div>
  );
};

export default ExtendedBasketItem;
