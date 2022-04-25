import { Video, VideoModel } from './video.model';

export const createVideo = ({ owner }: { owner: string }) =>
    VideoModel.create({
        owner,
    });

export const findVideo = (videoId: Video['videoId']) =>
    VideoModel.findOne({ videoId });

export const getVideos = () =>
    VideoModel.find({
        published: true,
    }).lean();

// export const updateVideo = (videoId: string, body: any) =>
//     VideoModel.findOneAndUpdate({ videoId }, body, { new: true });

export const deleteVideo = (videoId: Video['videoId']) =>
    VideoModel.findOneAndDelete({ videoId });
