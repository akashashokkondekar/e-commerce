import NavBar from '../components/NavBar';
import styles from './../css/NotFound.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { BackToHomeOptionText, ContentNotFoundText } from '../utils/AppConstant';

const NotFound: React.FC = () => {

  const basketItems = useSelector((state: RootState) => state.basket.items);

  return (
    <div>
      <NavBar basketItems={basketItems} />
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>{ContentNotFoundText}</p>
        <a href="/" className={styles.link}>{BackToHomeOptionText}</a>
      </div>
    </div>
  );
};

export default NotFound;
