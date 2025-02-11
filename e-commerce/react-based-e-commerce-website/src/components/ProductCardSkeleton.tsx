import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./../css/ProductCardSkeleton.module.css";

const ProductCardSkeleton: React.FC = () => {

  return (

    <div className={styles.productGrid}>
      <SkeletonTheme baseColor="#e0e0e0">
        <Skeleton height={200} width={"100%"} duration={1.5} />
        <Skeleton height={"1.25rem"} width={"60%"} duration={1.5} />
        <Skeleton height={"0.75rem"} width={"100%"} count={5} duration={1.5} />
        <Skeleton height={"1.25rem"} width={"30%"} duration={1.5} />
        <Skeleton height={"2.25rem"} width={"45%"} className='' duration={1.5} />
      </SkeletonTheme>
    </div>

  );
}

export default ProductCardSkeleton;
