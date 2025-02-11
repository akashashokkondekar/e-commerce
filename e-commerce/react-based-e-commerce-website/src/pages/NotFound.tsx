import NavBar from '../components/NavBar';
import styles from './../css/NotFound.module.css';

export default function NotFound() {
  return (<div>
    <NavBar/>
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Not Found</p>
      <a href="/" className={styles.link}>Back to Home</a>
    </div>
  </div>
  );
}