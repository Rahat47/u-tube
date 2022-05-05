import Link from 'next/link';
import { Video } from '../types';
import VideoTeaserCard from './VideoTeaserCard';

const VideoTeaser = ({ video }: { video: Video }) => {
    return (
        <Link href={`/watch/${video.videoId}`} passHref>
            <VideoTeaserCard
                title={video.title}
                description={video.description}
            />
        </Link>
    );
};

export default VideoTeaser;
