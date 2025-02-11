import styles from "./../css/ProductCard.module.css";
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../features/basket/basketSlice';
import { isEmpty, isNull } from "lodash";
import { AddItemOperationText, AddToBasketButtonConditionText, InfoNotAvailableText, OperationTypeEnum, RemoveItemFromBasketButtonConditionText, RemoveProductFromCartOperationText, ShowConfettiAnimationText } from "../utils/AppConstant";
import { AppUtils } from "../utils/AppUtils";

interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
}

interface EmitValue {
  operationType: number
}

interface ProductCardProps {
  performUserClickAction: any,
  currProductObj: {
    id: string;
    featuredImage: {
      url: string;
    };
    title: string;
    description: string | null;
    variants: {
      edges: {
        node: {
          price: {
            currencyCode: string;
            amount: string;
          };
        };
      }[];
    };
  };
  alreadyAddedInBasket: boolean;
}

export default function ProductCard({ performUserClickAction, currProductObj, alreadyAddedInBasket }: ProductCardProps) {

  const dispatch = useDispatch();

  const performUserClickOperation = (operationName: string) => {

    switch (operationName) {
      case AddItemOperationText:

        const basketItem: BasketItem = {
          id: currProductObj.id,
          title: currProductObj.title,
          price: parseFloat(currProductObj.variants.edges[0].node.price.amount),
          quantity: 1,
          currencyCode: AppUtils.GetCurrencySymbolUsingCode(currProductObj.variants.edges[0].node.price.currencyCode)
        };
        dispatch(addItem(basketItem));
        performPostItemAddOperation();
        break;

      case RemoveProductFromCartOperationText:
        dispatch(removeItem(currProductObj.id));
        performPostItemRemoveOperation();
        break;

    }
  }

  const performPostItemAddOperation = () => {

    const objToReturn: EmitValue = {
      operationType: OperationTypeEnum.Product_Added
    }
    performUserClickAction(objToReturn);

  }

  const performPostItemRemoveOperation = () => {

    const objToReturn: EmitValue = {
      operationType: OperationTypeEnum.Product_Removed
    }
    performUserClickAction(objToReturn);

  }

  return (

    <div key={currProductObj.id} className={styles.productCard}>

      <img src={currProductObj.featuredImage.url} alt={currProductObj.title} className={styles.productImage} loading="lazy" />
      <h3 className={styles.productTitle}>{currProductObj.title}</h3>
      <p className={styles.productDescription}>{(!isNull(currProductObj.description) && !isEmpty(currProductObj.description)) ? currProductObj.description : InfoNotAvailableText}</p>
      <p className={styles.productPrice}>{AppUtils.GetCurrencySymbolUsingCode(currProductObj.variants.edges[0].node.price.currencyCode)}{parseInt(currProductObj.variants.edges[0].node.price.amount).toFixed(2)}</p>
      <button
        onClick={() => performUserClickOperation(alreadyAddedInBasket ? RemoveProductFromCartOperationText : AddItemOperationText)}
        className={alreadyAddedInBasket ? styles.removeItemButton : styles.addButton}
      >
        {alreadyAddedInBasket ? RemoveItemFromBasketButtonConditionText : AddToBasketButtonConditionText}
      </button>
    </div>
  );
}
