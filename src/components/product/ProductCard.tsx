import styles from "./../../css/ProductCard.module.css";
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../features/basket/basketSlice';
import { isEmpty, isNull } from "lodash";
import { AddToBasketButtonConditionText, InfoNotAvailableText, OperationTypeEnum, RemoveItemFromBasketButtonConditionText } from "../../utils/AppConstant";
import { BasketItem, ProductCardProps, EmitValue } from "../../types/Interface";

export default function ProductCard({ performUserClickAction, currProductObj, alreadyAddedInBasket }: ProductCardProps) {

  const dispatch = useDispatch();

  const performUserClickOperation = (operationType: number) => {

    switch (operationType) {

      case OperationTypeEnum.Add_Product:

        const basketItem: BasketItem = {
          id: currProductObj.id,
          title: currProductObj.title,
          price: currProductObj.price,
          quantity: 1,
          currencyCode: currProductObj.currencyCode
        };
        dispatch(addItem(basketItem));
        performPostItemAddOperation();
        break;

      case OperationTypeEnum.Remove_Product:

        dispatch(removeItem(currProductObj.id));
        performPostItemRemoveOperation();
        break;

    }
  }

  const performPostItemAddOperation = () => {

    const objToReturn: EmitValue = {
      operationType: OperationTypeEnum.Add_Product,
      object: currProductObj
    }
    performUserClickAction(objToReturn);

  }

  const performPostItemRemoveOperation = () => {

    const objToReturn: EmitValue = {
      operationType: OperationTypeEnum.Remove_Product,
      object: currProductObj
    }
    performUserClickAction(objToReturn);

  }

  return (

    <div key={currProductObj.id} className={`card`}>

      <img className={`card-img-top ${styles.productImage}`} src={currProductObj.imageUrl} alt={currProductObj.title} loading="lazy" />
      <div className="card-body text-center">
        <h5 className="card-title">{currProductObj.title}</h5>
        <p className="card-text">{(!isNull(currProductObj.description) && !isEmpty(currProductObj.description)) ? currProductObj.description : InfoNotAvailableText}</p>
      </div>
      <div className={`card-footer bg-transparent text-center ${styles.border0px}`}>
        <p className={styles.productPrice}>{currProductObj.currencyCode}{currProductObj.price.toFixed(2)}</p>
        <button
          onClick={() => performUserClickOperation(alreadyAddedInBasket ? OperationTypeEnum.Remove_Product : OperationTypeEnum.Add_Product)}
          className={alreadyAddedInBasket ? styles.removeItemButton : styles.addButton}
        >
          {alreadyAddedInBasket ? RemoveItemFromBasketButtonConditionText : AddToBasketButtonConditionText}
        </button></div>
    </div>

  );
}
