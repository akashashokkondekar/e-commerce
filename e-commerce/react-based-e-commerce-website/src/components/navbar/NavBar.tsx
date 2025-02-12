import { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniBasket from '../minibasket/MiniBasket';
import { ShoppingCart } from 'lucide-react';
import styles from './../../css/NavBar.module.css';

import { WebsiteNameText, OptionOneText, OptionThreeText } from '../../utils/AppConstant';

interface NavBarProps {
  basketItems: Array<any>;
}

const NavBar: React.FC<NavBarProps> = ({ basketItems }) => {
  const [isBasketOpen, setBasketOpen] = useState<boolean>(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">{WebsiteNameText}</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/">{OptionOneText}</Link></li>
        {/* <li><Link to="/products">{OptionTwoText}</Link></li> */}
        <li><Link to="/aboutus">{OptionThreeText}</Link></li>
      </ul>
      <div className={styles.basketIcon} onClick={() => setBasketOpen(!isBasketOpen)}>
        <ShoppingCart size={24} fill={basketItems.length === 0 ? "" : "white"} />
      </div>

      {isBasketOpen && <MiniBasket />}
    </nav>
  );
};

export default NavBar;
