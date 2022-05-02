import ApiFeatures from '../../utils/apiFeatures';
import { Video, VideoModel } from './video.model';

export const createVideo = ({ owner }: { owner: string }) =>
    VideoModel.create({
        owner,
    });

export const findVideo = (videoId: Video['videoId']) =>
    VideoModel.findOne({ videoId });

export const getVideos = (query: object) =>
    new ApiFeatures(
        VideoModel.find({
            published: true,
        }),
        query
    )
        .filter()
        .sort()
        .limitFields()
        .paginate().query;

// export const updateVideo = (videoId: string, body: any) =>
//     VideoModel.findOneAndUpdate({ videoId }, body, { new: true });

export const deleteVideo = (videoId: Video['videoId']) =>
    VideoModel.findOneAndDelete({ videoId });
