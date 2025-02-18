// NavBar.tsx
export const WebsiteNameText = "E-Commerce";
export const OptionOneText = "Home";
export const OptionTwoText = "Products";
export const OptionThreeText = "About Us";

// AboutUs.tsx
export const AboutUsFirstSectionLabelText = "Our Story";
export const AboutUsFirstSectionLabelDesc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const AboutUsSecondSectionLabelText = "Our Mission";
export const AboutUsSecondSectionLabelDesc = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
export const AboutUsThirdSectionLabelText = "Contact Us";
export const AboutUsThirdSectionLabelDesc = "Have questions or feedback? We would love to hear from you! Reach out to us at <a href=\"mailto:akashkondekar00700@gmail.com\" style=\"color:#1e90ff; text-decoration: underline;\">akashkondekar00700@gmail.com</a>.";

// Product.tsx
export const InfoNotAvailableText = "Information Not Available.";
export const FirstSlideIntroLine = "Your One-Stop Online Shop for Everything!";
export const SecondSlideIntroLine = "Click, Shop, Enjoy 🚀";
export const ThirdSlideIntroLine = "Shopping Made Simple, Just for You.";
export const FourthSlideIntroLine = "Find Your Perfect Match with Us.";
export const FifthSlideIntroLine = "Discover Deals You Can't Resist!";
export const SixthSlideIntroLine = "Elevate Your Shopping Experience 🌟";
export const ConfettiEffectTimeOutValue = 3000; // In MS
export const ProductAddedIntoBasketText = "Product added into the basket.";
export const ProductRemovedFromBasketText = "Product removed from basket.";

// ProductCard.tsx
export const AddToBasketButtonConditionText = "Add to Basket";
export const RemoveItemFromBasketButtonConditionText = "Remove";

// Checkout.tsx
export const PlaceOrderText = "Place Order";
export const CartEmptyInfoText = "Your cart is empty.";
export const YourCartText = "Your Cart";
export const NamePlaceholderText = "Jone Doe";
export const EmailAddressPlaceholderText = "abc@gmail.com";
export const AddressPlaceholderText = "Warwickshire, United Kingdom BD12";
export const NameEmptyErrorText = "Full name can\'t be empty.";
export const EmailAddressEmptyErrorText = "Email address can\'t be empty.";
export const InvalidEmailAddressFoundErrorText = "Invalid Email address found.";
export const AddressEmptyErrorText = "Address can\'t be empty.";
export const OrderPlacedSuccessfullyText = "Your Order placed successfully.";
export const FullNameLabelText = "Name";
export const EmailLabelText = "Email";
export const AddressLabelText = "Delivery Address";

// MiniBasket.tsx
export const YourBasketText = "Your Basket";
export const BasketEmptyInfoText = "Your basket is empty.";
export const CheckoutButtonText = "Checkout";
export const TotalPriceText = "Total:";

// NotFound.tsx
export const ContentNotFoundText="Opsss...page not found.";
export const BackToHomeOptionText = "Back to Home";

// Toast Notification Configuration Param (Refer: https://fkhadra.github.io/react-toastify/introduction/)
export const NewestNotificationOnTop = true;
export const AutoCloseNotificationDuration = 2000; // In Ms
export const NotificationPosition = "bottom-right";
export const NotificationTheme = "dark";

// Enum
export enum OperationTypeEnum {
  None = 0,
  Add_Product = 1,
  Remove_Product = 2,
  Increase_Product_Quantity = 3,
  Decrease_Product_Quantity = 4
}

export enum ToastTypeEnum {
  Default = 0,
  Error = 1,
  Success = 2,
  Warning = 3
}

// Testcase values
export const InitialReduxStateValues = {
  basket: {
    items: [
      { id: '1', title: 'Test Product 1', price: 100, quantity: 1, currencyCode: '$' },
      { id: '2', title: 'Test Product 2', price: 50, quantity: 1, currencyCode: '$' },
    ],
  },
}
