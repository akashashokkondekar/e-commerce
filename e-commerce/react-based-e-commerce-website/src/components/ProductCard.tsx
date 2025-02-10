import styles from "./../css/ProductCard.module.css";
import { useDispatch } from 'react-redux';
import { addItem } from '../features/basket/basketSlice';

export default function ProductCard({ currProductObj }) {

  const dispatch = useDispatch();
  
  return (

    <div key={currProductObj.id} className={styles.productCard}>
      
      <img src={currProductObj.featuredImage.url} alt={currProductObj.title} className={styles.productImage} loading="lazy" />
      <h3 className={styles.productTitle}>{currProductObj.title}</h3>
      <p className={styles.productDescription}>{currProductObj.description}</p>
      <p className={styles.productPrice}>${parseInt(currProductObj.variants.edges[0].node.price.amount).toFixed(2)}</p>
      <button
        onClick={() => dispatch(addItem(currProductObj))}
        className={styles.addButton}
      >
        Add to Basket
      </button>
    </div>

  );
}