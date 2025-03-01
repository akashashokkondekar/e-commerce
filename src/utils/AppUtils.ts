import { ByNameFilterKeyOptionText, DefaultFilterKeyOptionText, FilterSortEnum, PriceHighToLowFilterKeyOptionText, PriceLowToHighFilterKeyOptionText } from "./AppConstant";

export class AppUtils {

  static GetCurrencySymbolUsingCode(currencyCode: string) {

    let valueToReturn = "";
    switch (currencyCode) {

      default:
        valueToReturn = "$";
        break;

      case "USD":
      case "CAD":
        valueToReturn = "$";
        break;
    }
    return valueToReturn;

  }

  static isValidateEmailAddress = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  static getFilterKeyOptionText = (key: any) => {

    var valueToReturn = DefaultFilterKeyOptionText;
    switch (parseInt(FilterSortEnum[key])) {

      case FilterSortEnum.Name:
        valueToReturn = ByNameFilterKeyOptionText;
        break;

      case FilterSortEnum.Price_Low_To_High:
        valueToReturn = PriceLowToHighFilterKeyOptionText;
        break;

      case FilterSortEnum.Price_High_To_Low:
        valueToReturn = PriceHighToLowFilterKeyOptionText;
        break;

    }
    return valueToReturn;
  
  }
}