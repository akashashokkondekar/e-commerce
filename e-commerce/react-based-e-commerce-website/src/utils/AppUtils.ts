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
}