import styles from './../css/AboutUs.module.css';
import NavBar from '../components/NavBar';

const AboutUs = () => {

  return (
    <div>
      <NavBar />
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Test Subtitle 1</h2>
        <p className={styles.text}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Test Subtitle 2</h2>
        <p className={styles.text}>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Contact Us</h2>
        <p className={styles.text}>
          React out here - akashkondekar00700@gmail.com
        </p>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
