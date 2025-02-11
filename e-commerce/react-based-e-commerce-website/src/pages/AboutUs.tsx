import styles from './../css/AboutUs.module.css';
import NavBar from '../components/NavBar';
import { AboutUsFirstSectionLabelDesc, AboutUsFirstSectionLabelText, AboutUsSecondSectionLabelDesc, AboutUsSecondSectionLabelText, AboutUsThirdSectionLabelDesc, AboutUsThirdSectionLabelText, OptionThreeText } from '../utils/AppConstant';

const AboutUs = () => {
  return (
    <div>
      <NavBar/>
    <div className={styles.container}>
      <h1 className={styles.title}>{OptionThreeText}</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>{AboutUsFirstSectionLabelText}</h2>
        <p className={styles.text}>
          {AboutUsFirstSectionLabelDesc}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>{AboutUsSecondSectionLabelText}</h2>
        <p className={styles.text}>{AboutUsSecondSectionLabelDesc}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>{AboutUsThirdSectionLabelText}</h2>
        <p className={styles.text}  dangerouslySetInnerHTML={{__html: AboutUsThirdSectionLabelDesc}}>
        </p>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
