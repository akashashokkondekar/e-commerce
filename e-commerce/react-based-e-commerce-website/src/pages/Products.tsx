import { useState } from 'react';
import styles from './../css/Products.module.css';
import NavBar from '../components/NavBar';

const Products = () => {
  const [products, setProducts] = useState([{}, {}, {}]);

  return (
    <div>
      <NavBar />
      <div className={styles.productGrid}>
        {products.map((product, index) => (
          <div key={product.id} className={styles.productCard}>
            <img src="" alt="Product-img" className={styles.productImage} />
            <h3 className={styles.productTitle}>{`Title ${index}`}</h3>
            <p className={styles.productDescription}>{`Desc ${index}`}</p>
            <p className={styles.productPrice}>`$5{index}`</p>
            <button className={styles.addButton}>
              Add to Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
