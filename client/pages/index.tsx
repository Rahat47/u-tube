import HomePageLayout from '../layout/Home';

import styles from '../styles/Home.module.css';

const Home = () => {
    return <div className={styles.container}></div>;
};

Home.getLayout = function (page: React.ReactNode) {
    return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
