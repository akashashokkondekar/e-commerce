import "./../index.css";
import ProductCard from "../components/ProductCard";
import styles from "./../css/Product.module.css";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../components/NavBar";

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

const Get_Collection_List = gql`
  {
  collections(first: 10) {
    edges {
      cursor
      node {
        id
        handle
        title
        description
        image {
          id
          url
        }
      }
    }
  }
}
`;

function Product() {

  const { loading, error, data } = useQuery(Get_Product_List);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.productGrid}>
        {

          data.products.edges.map((currProductObj: any) => (
            <ProductCard
              key={currProductObj.node.id}
              currProductObj={currProductObj.node}/>
          ))

        }
      </div>
    </div>);
}


export default Product; 