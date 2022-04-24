import { VideoModel } from './video.model';

export const createVideo = ({ owner }: { owner: string }) =>
    VideoModel.create({
        owner,
    });
