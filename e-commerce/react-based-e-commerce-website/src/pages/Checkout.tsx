import { RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from './../css/Checkout.module.css';
import NavBar from '../components/NavBar';
import { AddressEmptyErrorText, AddressPlaceholderText, AutoCloseNotificationDuration, CartEmptyInfoText, EmailAddressEmptyErrorText, EmailAddressPlaceholderText, InvalidEmailAddressFoundErrorText, NameEmptyErrorText, NamePlaceholderText, NewestNotificationOnTop, NotificationPosition, NotificationTheme, OrderPlacedSuccessfullyText, PlaceOrderText, ToastTypeEnum, TotalPriceText, YourCartText } from '../utils/AppConstant';
import { useState } from 'react';
import { isEmpty, isNull } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { AppUtils } from '../utils/AppUtils';
import { clearBasket } from '../features/basket/basketSlice';
import { useNavigate } from "react-router-dom";

interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
}

interface formFields {
  name: string;
  email: string;
  address: string;
}

const Checkout: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDeliveryDetails, setUserDeliveryDetails] = useState<formFields>({
    name: "",
    email: "",
    address: ""
  });

  const handlePlaceOrderOperation = () => {

    if (validateInputFeildsBeforeSubmit()) {
      showToastMsgToUser(OrderPlacedSuccessfullyText, ToastTypeEnum.Success);
      dispatch(clearBasket());
      redirectUserOnHomeScreen();
    }

  }

  const validateInputFeildsBeforeSubmit = () => {

    let valueToReturn = true;
    let msgToShow = "";
    if (isNull(userDeliveryDetails.name) || isEmpty(userDeliveryDetails.name) || userDeliveryDetails.name.trim().length === 0) {
      valueToReturn = false;
      msgToShow = NameEmptyErrorText;
    }
    else if (isNull(userDeliveryDetails.email) || isEmpty(userDeliveryDetails.email) || userDeliveryDetails.email.trim().length === 0) {
      valueToReturn = false;
      msgToShow = EmailAddressEmptyErrorText;
    }
    else if (!AppUtils.isValidateEmailAddress(userDeliveryDetails.email)) {
      valueToReturn = false;
      msgToShow = InvalidEmailAddressFoundErrorText;
    }
    else if (isNull(userDeliveryDetails.address) || isEmpty(userDeliveryDetails.address) || userDeliveryDetails.address.trim().length === 0) {
      valueToReturn = false;
      msgToShow = AddressEmptyErrorText;
    }

    if (!valueToReturn) {
      showToastMsgToUser(msgToShow, ToastTypeEnum.Error);
    }
    return valueToReturn;
  }

  const redirectUserOnHomeScreen = () => {
    setTimeout(() => {
      navigate("/");
    }, AutoCloseNotificationDuration);
  }

  const showToastMsgToUser = (msgToShow: string, type: number) => {

    switch (type) {

      default:
      case ToastTypeEnum.Default:
        toast(msgToShow);
        break;

      case ToastTypeEnum.Success:
        toast.success(msgToShow);
        break;

      case ToastTypeEnum.Error:
        toast.error(msgToShow);
        break;

      case ToastTypeEnum.Warning:
        toast.warning(msgToShow);
        break;
    }
  }

  const basketItems = useSelector((state: RootState) => state.basket.items);
  const totalPrice = basketItems.reduce((acc: number, item: BasketItem) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <NavBar basketItems={basketItems} />

      <ToastContainer
        draggable
        closeOnClick
        newestOnTop={NewestNotificationOnTop}
        autoClose={AutoCloseNotificationDuration}
        theme={NotificationTheme}
        position={NotificationPosition} />

      <div className={styles.checkoutContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.header}>Checkout</h1>
          <div className={styles.form}>
            <label className={styles.label}>Name
              <input type="text" value={userDeliveryDetails.name} disabled={basketItems.length === 0} onChange={e => setUserDeliveryDetails({ ...userDeliveryDetails, name: e.target.value })} className={styles.input} placeholder={NamePlaceholderText} />
            </label>
            <label className={styles.label}>Email
              <input type="email" value={userDeliveryDetails.email} disabled={basketItems.length === 0} onChange={e => setUserDeliveryDetails({ ...userDeliveryDetails, email: e.target.value })} className={styles.input} placeholder={EmailAddressPlaceholderText} />
            </label>
            <label className={styles.label}>Address
              <textarea value={userDeliveryDetails.address} disabled={basketItems.length === 0} onChange={e => setUserDeliveryDetails({ ...userDeliveryDetails, address: e.target.value })} className={styles.textarea} placeholder={AddressPlaceholderText} />
            </label>
            <button onClick={() => handlePlaceOrderOperation()} disabled={basketItems.length === 0} className={basketItems.length === 0 ? styles.disableSubmitButton : styles.submitButton}>{PlaceOrderText}</button>
          </div>
        </div>

        <div className={styles.cartSection}>
          <h2 className={styles.cartHeader}>{YourCartText}</h2>
          {
            basketItems.length === 0 ? (
              <p className={styles.emptyCart}>{CartEmptyInfoText}</p>
            ) : (
              basketItems.map((item: BasketItem) => (
                <div key={item.id} className={styles.cartItem}>
                  <span className={styles.itemName}>{item.title} x{item.quantity}</span>
                  <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )
          }
          {
            basketItems.length > 0 &&
            (<div className={styles.totalSection}>
              <span>{TotalPriceText}</span>
              <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
            </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Checkout;
