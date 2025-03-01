import React, { Suspense, useState } from 'react';
const ProductCard = React.lazy(() => import("../components/product/ProductCard"));
import styles from "./../css/Product.module.css";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../components/navbar/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { isEmpty, isNull, orderBy } from "lodash";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton";
import { AutoCloseNotificationDuration, ConfettiEffectTimeOutValue, NewestNotificationOnTop, NotificationPosition, NotificationTheme, OperationTypeEnum, DefaultProductAddedIntoBasketText, DefaultProductRemovedFromBasketText, ToastTypeEnum, CustomProductNameText, DefaultProductNameText, FilterSortEnum } from "../utils/AppConstant";
import Confetti from "../components/other/Confetti";
import $ from "jquery";
import { useEffect } from "react";
import BannerSlider from "../components/other/BannerSlider";
import { ToastContainer, toast } from 'react-toastify';
import { ProductListData, EmitValue, ProductObj } from '../types/Interface';
import { NetworkStatus } from '@apollo/client';
import { AppUtils } from '../utils/AppUtils';
import FilterBar from '../components/other/FilterBar';

let timeOutInstance: any = null;

const Get_Product_List = gql`
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          description
          featuredImage {
            id
            url
          }
          variants(first: 3) {
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

  const { loading, error, data, refetch, networkStatus } = useQuery<ProductListData>(Get_Product_List, {
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first', // Used for subsequent executions
    pollInterval: 0,
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    setSortedProducts(getDefaultStructuredProductList());
  }, [data]);

  const [productList, setSortedProducts] = useState<ProductObj[]>([]);
  const basketItems = useSelector((state: RootState) => state.basket.items);

  useEffect(() => {
    $("#confetti").hide();
  }, []);

  const getDefaultStructuredProductList = () => {

    var defaultStructuredProductList: ProductObj[] = [];
    if (data?.products) {

      defaultStructuredProductList = data?.products.edges.map(edge => {

        const node = edge.node;
        const price = parseFloat(node.variants.edges[0].node.price.amount);
        const currencyCode = node.variants.edges[0].node.price.currencyCode;

        return {
          id: node.id,
          title: node.title,
          description: node.description,
          price: price,
          imageUrl: node.featuredImage?.url,
          currencyCode: AppUtils.GetCurrencySymbolUsingCode(currencyCode)
        };
      });

    }
    return defaultStructuredProductList;
  }

  const handleUserClicks = (emittedObj: EmitValue) => {

    let productNameText = CustomProductNameText.replace("{product_name}", (!isNull(emittedObj.object) && !isEmpty(emittedObj.object)) ? emittedObj.object.title : DefaultProductNameText);
    switch (emittedObj.operationType) {

      case OperationTypeEnum.Add_Product:

        handleConfettiAnimation();
        showToastMsgToUser(`${productNameText} ${DefaultProductAddedIntoBasketText}`, ToastTypeEnum.Success);
        break;

      case OperationTypeEnum.Remove_Product:

        showToastMsgToUser(`${productNameText} ${DefaultProductRemovedFromBasketText}`, ToastTypeEnum.Warning);
        break;

      case OperationTypeEnum.Refresh_Records:
        refetch();
        break;

      case OperationTypeEnum.Filter_Records:

        var filteredRecords: ProductObj[] = [];
        switch (emittedObj.object) {

          case FilterSortEnum.Default:
            filteredRecords = getDefaultStructuredProductList();;
            break;

          case FilterSortEnum.Price_High_To_Low:
            filteredRecords = orderBy(productList, 'price', ['desc']);
            break;
          case FilterSortEnum.Price_Low_To_High:
            filteredRecords = orderBy(productList, 'price', ['asc']);
            break;

          case FilterSortEnum.Name:
            filteredRecords = orderBy(productList, 'title', ['asc']);
            break;
        }
        setSortedProducts(filteredRecords);
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

  if (networkStatus === NetworkStatus.error) { showToastMsgToUser("Internet NOOO", ToastTypeEnum.Error) };
  if (error) { showToastMsgToUser(error.message, ToastTypeEnum.Error) };


  return (

    <div>
      <Confetti />
      <NavBar basketItems={basketItems} />
      <BannerSlider />
      <FilterBar
        loading={loading}
        performUserClickAction={handleUserClicks} />
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
              productList?.map((currProductObj) => (
                <Suspense fallback={<ProductCardSkeleton />} key={currProductObj.id}>
                  <ProductCard
                    performUserClickAction={handleUserClicks}
                    key={currProductObj.id}
                    currProductObj={currProductObj}
                    alreadyAddedInBasket={
                      !isNull(basketItems) && !isEmpty(basketItems) &&
                      basketItems.some((currObj) => currObj.id === currProductObj.id)
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
