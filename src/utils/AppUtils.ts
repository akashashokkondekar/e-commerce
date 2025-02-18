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
}