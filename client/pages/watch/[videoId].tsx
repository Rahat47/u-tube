import { Container, createStyles, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

const useStyles = createStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    video: {
        borderRadius: '10px',
    },
}));

const WatchVideoPage = () => {
    const { query } = useRouter();
    const { classes } = useStyles();

    return (
        <Container className={classes.root} py={30}>
            {query.videoId && (
                // <video
                //     controls
                //     muted
                //     width={800}
                //     height={'auto'}
                //     // autoPlay
                //     id='video-player'
                //     className={classes.video}
                // >
                //     <source
                //         src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/videos/${query.videoId}`}
                //         type='video/mp4'
                //     />
                // </video>

                <ReactPlayer
                    url={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/videos/${query.videoId}`}
                    controls
                    width={800}
                    height={'auto'}
                    className={classes.video}
                />
            )}

            <Text>
                <h1>{query.videoId}</h1>
            </Text>
        </Container>
    );
};

export default WatchVideoPage;
