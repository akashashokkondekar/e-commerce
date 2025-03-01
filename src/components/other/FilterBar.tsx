import styles from "./../../css/FilterBar.module.css";
import { EmitValue, FilterProps } from "../../types/Interface";
import { FilterSortEnum, OperationTypeEnum, RefreshLabelText, SortByLabelText } from "../../utils/AppConstant";
import { AppUtils } from "../../utils/AppUtils";
import { RefreshCcw } from 'lucide-react';

export default function FilterBar({ loading, performUserClickAction }: FilterProps) {

  const onFilterValueSelection = (selectedFilterKeyForSearch: any) => {
    const objToReturn: EmitValue = {
      operationType: OperationTypeEnum.Filter_Records,
      object: parseInt(FilterSortEnum[selectedFilterKeyForSearch])
    }
    performUserClickAction(objToReturn);
  };

  const refreshRecord = () => {

    if (!loading) {

      const objToReturn: EmitValue = {
        operationType: OperationTypeEnum.Refresh_Records,
        object: null
      }
      performUserClickAction(objToReturn);

    }
    
  }

  const filterKeyList = Object.keys(FilterSortEnum).filter(key => isNaN(Number(key)));

  return (

    <div className={styles.filterBar}>
      <div className={(!loading) ? `${styles.refreshContainer} ${styles.cursorPointer}` : `${styles.refreshContainer} ${styles.opacityPoint5}`} onClick={() => refreshRecord()}>
        <RefreshCcw size={24} className={styles.marginRight5px} />{RefreshLabelText}
      </div>
      <div className={styles.sortContainer}>
        <div className={styles.marginRight10px}>
          {SortByLabelText}
        </div>
        <div>
          <select
            onChange={(e) => onFilterValueSelection(e.target.value)}
            className={styles.sortDropdown}
          >
            {filterKeyList.map((key, index) => (
              <option key={index} value={key}>
                {AppUtils.getFilterKeyOptionText(key)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div >
  );
};
