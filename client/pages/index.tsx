import { useVideo } from '../context/videos';
import HomePageLayout from '../layout/Home';

const Home = () => {
    const { videos, refetch } = useVideo();

    return <div>{JSON.stringify(videos)} </div>;
};

Home.getLayout = function (page: React.ReactNode) {
    return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
