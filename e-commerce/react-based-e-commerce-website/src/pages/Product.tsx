import React, { Suspense } from 'react';
const ProductCard = React.lazy(() => import("../components/product/ProductCard"));
import styles from "./../css/Product.module.css";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../components/navbar/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { isEmpty, isNull } from "lodash";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton";
import { AutoCloseNotificationDuration, ConfettiEffectTimeOutValue, NewestNotificationOnTop, NotificationPosition, NotificationTheme, OperationTypeEnum, ProductAddedIntoBasketText, ProductRemovedFromBasketText, ToastTypeEnum } from "../utils/AppConstant";
import Confetti from "../components/other/Confetti";
import $ from "jquery";
import { useEffect } from "react";
import BannerSlider from "../components/other/BannerSlider";
import { ToastContainer, toast } from 'react-toastify';
import { ProductListData, EmitValue } from '../types/Interface';

let timeOutInstance: any = null;

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

  const handleUserClicks = (obj: EmitValue) => {

    switch (obj.operationType) {

      case OperationTypeEnum.Add_Product:

        handleConfettiAnimation();
        showToastMsgToUser(ProductAddedIntoBasketText, ToastTypeEnum.Success);
        break;

      case OperationTypeEnum.Remove_Product:
        showToastMsgToUser(ProductRemovedFromBasketText, ToastTypeEnum.Warning);
        break;

    }
  }

  const showToastMsgToUser = (msgToShow: string, type: number) => {

    switch (type) {

      default:
      case ToastTypeEnum.Default:
        toast(msgToShow);
        break;

      case ToastTypeEnum.Success:
        toast.success(msgToShow);
        break;

      case ToastTypeEnum.Error:
        toast.error(msgToShow);
        break;

      case ToastTypeEnum.Warning:
        toast.warning(msgToShow);
        break;
    }
  }

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

  if (error) { showToastMsgToUser(error.message, ToastTypeEnum.Error) };

  return (
    <div>
      <Confetti />
      <NavBar basketItems={basketItems} />
      <BannerSlider />
      <ToastContainer
        draggable
        closeOnClick
        newestOnTop={NewestNotificationOnTop}
        autoClose={AutoCloseNotificationDuration}
        theme={NotificationTheme}
        position={NotificationPosition} />
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
                    performUserClickAction={handleUserClicks}
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
