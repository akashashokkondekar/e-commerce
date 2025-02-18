export interface ProductVariant {
  edges: {
    node: {
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }[];
}

export interface EmitValue {
  operationType: number
}

export interface ProductNode {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    id: string;
    url: string;
  };
  variants: ProductVariant;
}

export interface ProductListData {
  products: {
    edges: {
      node: ProductNode;
    }[];
  };
}

export interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
}

export interface FormFields {
  name: string;
  email: string;
  address: string;
}


export interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
}

export interface ProductCardProps {
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

export interface NavBarProps {
  basketItems: Array<any>;
}

export interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  currencyCode: string;
}

export interface BasketItemProps {
  item: BasketItem;
  index: number;
  performUserClickOperation: any;
}


