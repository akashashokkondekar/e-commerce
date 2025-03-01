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
  operationType: number,
  object: any
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
  currProductObj: ProductObj,
  alreadyAddedInBasket: boolean;
}

export interface ProductObj {
  id: string,
  title: string,
  description: string | null,
  price: number,
  imageUrl: string,
  currencyCode: string
}

export interface FilterProps {
  performUserClickAction: any,
  loading: boolean
}

export interface NavBarProps {
  basketItems: Array<any>;
}

export interface BasketItemProps {
  item: BasketItem;
  index: number;
  performUserClickOperation: any;
}


