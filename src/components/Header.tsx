import styles from './Header.module.css';

import logoImage from '../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImage} alt="Logotipo" />
    </header>
  )
}