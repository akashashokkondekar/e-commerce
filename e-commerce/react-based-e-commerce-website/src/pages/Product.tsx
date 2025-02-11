import React, { Suspense } from 'react';
const ProductCard = React.lazy(() => import("../components/ProductCard"));
import styles from "./../css/Product.module.css";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../components/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { isEmpty, isNull } from "lodash";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { ConfettiEffectTimeOutValue } from "../utils/AppConstant";
import Confetti from "../components/Confetti";
import $ from "jquery";
import { useEffect } from "react";
import BannerSlider from "../components/BannerSlider";

let timeOutInstance: any = null;

interface ProductVariant {
  edges: {
    node: {
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }[];
}

interface ProductNode {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    id: string;
    url: string;
  };
  variants: ProductVariant;
}

interface ProductListData {
  products: {
    edges: {
      node: ProductNode;
    }[];
  };
}

const Get_Product_List = gql`
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          featuredImage {
            id
            url
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Product: React.FC = () => {

  const { loading, error, data } = useQuery<ProductListData>(Get_Product_List);
  const basketItems = useSelector((state: RootState) => state.basket.items);

  useEffect(() => {
    $("#confetti").hide();
  }, []);

  const handleConfettiAnimation = () => {

    if (!isNull(timeOutInstance) && !isEmpty(timeOutInstance)) {
      clearTimeout(timeOutInstance);
    }
    $("#confetti").fadeIn(200);
    timeOutInstance = setTimeout(() => {
      $("#confetti").fadeOut(500);
      timeOutInstance = null;
    }, ConfettiEffectTimeOutValue);

  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Confetti />
      <NavBar basketItems={basketItems} />
      <BannerSlider />
      {
        (loading) && (
          <div className={styles.productGrid}>
            {
              [...Array(10)].map((_, currNumber) => (
                <ProductCardSkeleton key={currNumber} />
              ))
            }
          </div>
        )
      }

      {
        (!loading) && (
          <div className={styles.productGrid}>
            {
              data?.products.edges.map((currProductObj) => (
                <Suspense fallback={<ProductCardSkeleton />} key={currProductObj.node.id}>
                  <ProductCard
                    handleConfettiAnimation={handleConfettiAnimation}
                    key={currProductObj.node.id}
                    currProductObj={currProductObj.node}
                    alreadyAddedInBasket={
                      !isNull(basketItems) && !isEmpty(basketItems) &&
                      basketItems.some((currObj) => currObj.id === currProductObj.node.id)
                    }
                  />
                </Suspense>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default Product;
