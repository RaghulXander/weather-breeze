import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { WeatherLogo } from 'icons/Icons';
import styles from "./Header.module.scss"
import { SearchAutoComplete } from 'components/atoms';

type IHeader = {
  theme?: boolean;
  setTheme?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => {};
};

export const Header: React.FC<IHeader> = ({ theme, setTheme, onClick }) => {
  const [burger, setBurger] = React.useState<boolean>(false);
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const location = useLocation();
  const [toggled, setToggled] = React.useState(false);
  const getPath = () => {
    if (location.pathname === '/') {
      return 'Home';
    } else {
      const firstLetter = location.pathname.charAt(1).toUpperCase();
      return firstLetter + location.pathname.substring(2);
    }
  };
  return (
    <header className={styles.containerWrapper}>
       <nav className={styles.container}>
          <div className={styles.logo}>
            <NavLink to='/'>
              {/*<WIwi*/}
              <WeatherLogo size={48} />
            <div>W-Breeze</div>
            </NavLink>
        </div>
        <div className={styles.searchContainer}>
          <SearchAutoComplete />
        </div>
        <div>
          <button onClick={() => { }}>
            <span>Locate me</span>
          </button>
          <button
            className={styles.switch}
            onClick={() => {
            setToggled((checked) => !checked);
            onClick();
          }}>
            <span className={toggled ? styles.enabled : styles.disabled} />
          </button>
        </div>
        {/*<ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink to='/today' children='Today' />
          </li>
          <li className={styles.menuItem}>
            <NavLink to='/tomorrow' children='Tomorrow' />
          </li>
          <li className={styles.menuItem}>
            <NavLink to='/month' children='Month' />
          </li>
        </ul>*/}
        </nav>
    </header>
  );
};
