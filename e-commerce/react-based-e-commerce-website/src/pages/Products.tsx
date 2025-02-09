import { useState } from 'react';
import styles from './../css/Products.module.css';
import NavBar from '../components/NavBar';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/basket/basketSlice';

const Products = () => {
  const [products, setProducts] = useState([{}, {}, {}]);
  const dispatch = useDispatch();
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
            <button className={styles.addButton}  onClick={() => dispatch(addItem(product))}>
              Add to Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
