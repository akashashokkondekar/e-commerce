import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./../index.css";
import React, { Suspense } from 'react';
const ProductCard = React.lazy(() => import("../components/ProductCard"));
import styles from "./../css/Product.module.css";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../components/NavBar";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { isEmpty, isNull } from "lodash";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { FifthSlideIntroLine, FirstSlideIntroLine, FourthSlideIntroLine, SecondSlideIntroLine, SixthSlideIntroLine, ThirdSlideIntroLine } from "../utils/AppConstant";

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

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <NavBar basketItems={basketItems} />
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">{FirstSlideIntroLine}</div>
        <div className="keen-slider__slide number-slide2">{SecondSlideIntroLine}</div>
        <div className="keen-slider__slide number-slide3">{ThirdSlideIntroLine}</div>
        <div className="keen-slider__slide number-slide4">{FourthSlideIntroLine}</div>
        <div className="keen-slider__slide number-slide5">{FifthSlideIntroLine}</div>
        <div className="keen-slider__slide number-slide6">{SixthSlideIntroLine}</div>
      </div>
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
