import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeItem, updateQuantity } from '../../features/basket/basketSlice';
import { Link } from 'react-router-dom';
import { BasketEmptyInfoText, CheckoutButtonText, MaxVisibleItemViewCount, OperationTypeEnum, SeeMoreText, TotalPriceText, YourBasketText } from '../../utils/AppConstant';
import BasketItemComponent from './BasketItem';
import { BasketItem } from '../../types/Interface';
import styles from '../../css/MiniBasket.module.css';

const MiniBasket: React.FC = () => {
  const basketItems = useSelector((state: RootState) => state.basket.items as BasketItem[]);
  const dispatch = useDispatch();

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

  const totalPrice = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const visibleBasketItems = basketItems.slice(0, MaxVisibleItemViewCount);

  return (
    <div className={styles.container}>
      {basketItems.length > 0 && <h2 className={styles.header}>{YourBasketText}</h2>}
      {basketItems.length === 0 ? (
        <p className={styles.empty}>{BasketEmptyInfoText}</p>
      ) : (
        <>
          <div className={styles.itemList}>
            {visibleBasketItems.map((item, index) => (
              <BasketItemComponent
                key={item.id}
                item={item}
                index={index}
                performUserClickOperation={performUserClickOperation}
              />
            ))}
          </div>
          {basketItems.length > MaxVisibleItemViewCount && (
            <div className={styles.seeMoreBlock}>
              <Link to={'/extendedbasketitem'}>
                <button className={styles.seeMoreBtn}>
                  {SeeMoreText.replace('{count}', (basketItems.length - MaxVisibleItemViewCount).toString())}
                </button>
              </Link>
            </div>
          )}
          <div className={styles.footer}>
            <span>
              {TotalPriceText} {basketItems[0].currencyCode}
              {totalPrice.toFixed(2)}
            </span>
            <Link to={'/checkout'}>
              <button className={styles.checkoutBtn}>{CheckoutButtonText}</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniBasket;
