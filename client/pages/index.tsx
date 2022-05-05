import { SimpleGrid, Stack } from '@mantine/core';
import VideoTeaser from '../components/VideoTeaser';
import { useVideo } from '../context/videos';
import HomePageLayout from '../layout/Home';

const Home = () => {
    const { videos } = useVideo();

    return (
        <SimpleGrid cols={3}>
            {(videos || []).map(video => (
                <VideoTeaser key={video.videoId} video={video} />
            ))}{' '}
        </SimpleGrid>
    );
};

Home.getLayout = function (page: React.ReactNode) {
    return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
