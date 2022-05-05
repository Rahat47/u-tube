import { Loader } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    useQuery,
} from 'react-query';
import { getVideos } from '../api';
import { GetVideosReturnType, QueryKeys, Video } from '../types';

interface VideoContextType {
    videos: Video[] | undefined;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<GetVideosReturnType, unknown>>;
}

//@ts-ignore
const VideoContext = createContext<VideoContextType>(null);

const VideoContextProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, refetch } = useQuery(QueryKeys.VIDEOS, getVideos);

    return (
        <VideoContext.Provider
            value={{
                videos: data?.data,
                refetch,
            }}
        >
            {isLoading ? <Loader /> : children}
        </VideoContext.Provider>
    );
};

const useVideo = () => useContext(VideoContext);

export { VideoContextProvider, useVideo };
