import { OperationTypeEnum } from '../../utils/AppConstant';
import styles from './../../css/BasketItem.module.css';
import { Minus, Plus, X } from 'lucide-react';
import { BasketItemProps } from '../../types/Interface';

export default function BasketItem({ item, index, performUserClickOperation }: BasketItemProps) {
  return (
    <div key={item.id} className={styles.item}>
      <div className={styles.leftSection}>
        <span className={styles.name}>{`${index + 1}. ${item.title}`}</span>
        <div className={styles.controls}>
          <button
            onClick={() => performUserClickOperation(OperationTypeEnum.Decrease_Product_Quantity, item)}
            className={styles.iconButton}
          >
            <Minus size={16} aria-label={`minus-item_${index + 1}`} data-testid={`minus-item_${index + 1}`} />
          </button>
          <span aria-label={`quantity_count_${index + 1}`} data-testid={`quantity_count_${index + 1}`}>
            {item.quantity}
          </span>
          <button
            onClick={() => performUserClickOperation(OperationTypeEnum.Increase_Product_Quantity, item)}
            className={styles.iconButton}
          >
            <Plus size={16} aria-label={`add-item_${index + 1}`} data-testid={`add-item_${index + 1}`} />
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <span className={styles.price}>
          {item.currencyCode}
          {(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          aria-label={`remove-item_${index + 1}`}
          data-testid={`remove-item_${index + 1}`}
          onClick={() => performUserClickOperation(OperationTypeEnum.Remove_Product, item)}
          className={styles.removeBtn} >
          <X size={21} />
        </button>
      </div>
    </div>
  );
}
