import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniBasket from './MiniBasket';
import { ShoppingCart } from 'lucide-react';
import styles from './../css/NavBar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const NavBar = () => {
  const [isBasketOpen, setBasketOpen] = useState(false);
  const basketItems = useSelector((state: RootState) => state.basket.items);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">E-Commerce</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
      </ul>
      <div className={styles.basketIcon} onClick={() => setBasketOpen(!isBasketOpen)}>
        <ShoppingCart size={24} fill={(basketItems.length === 0) ? "" : "white"}/>
      </div>

      {isBasketOpen && <MiniBasket />}
    </nav>
  );
};

export default NavBar;
