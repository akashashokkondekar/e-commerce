import { Link } from 'react-router-dom';
import styles from './../css/NavBar.module.css';

const NavBar = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>OSC Shop</div>
    <div className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
    </div>
  </nav>
);

export default NavBar;
