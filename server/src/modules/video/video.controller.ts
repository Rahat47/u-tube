import fs from 'fs';
import busboy from 'busboy';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import AppError from '../../utils/appError';
import { Video } from './video.model';
import { createVideo, findVideo, getVideos } from './video.service';
import { UpdateVideoBody, UpdateVideoParams } from './video.schema';

const MIME_TYPES = ['video/mp4'];

const getPath = ({
    videoId,
    extension,
}: {
    videoId: Video['videoId'];
    extension: Video['extension'];
}) => `${process.cwd()}/uploads/videos/${videoId}.${extension}`;

export const uploadVideoHandler: RequestHandler = async (req, res, next) => {
    const bb = busboy({ headers: req.headers });

    const { user } = res.locals;

    const video = await createVideo({ owner: user._id });

    bb.on('file', async (_, file, info) => {
        if (!MIME_TYPES.includes(info.mimeType)) {
            return next(
                new AppError('Invalid file type', StatusCodes.BAD_REQUEST)
            );
        }

        const extension = info.mimeType.split('/')[1];

        const filePath = getPath({ extension, videoId: video.videoId });

        video.extension = extension;
        await video.save();

        const stream = fs.createWriteStream(filePath);

        file.pipe(stream);
    });

    bb.on('close', () => {
        res.writeHead(StatusCodes.CREATED, {
            'Content-Type': 'application/json',
            Connection: 'close',
        });

        res.write(JSON.stringify(video));

        res.end();
    });

    return req.pipe(bb);
};

export const updateVideoHandler = expressAsyncHandler<
    UpdateVideoParams,
    {},
    UpdateVideoBody
>(async (req, res, next) => {
    const { videoId } = req.params;
    const { title, description, published } = req.body;
    const { _id: userId } = res.locals.user;

    const video = await findVideo(videoId);

    if (!video) {
        return next(new AppError('Video not found', StatusCodes.NOT_FOUND));
    }

    if (video.owner!.toString() !== userId) {
        return next(
            new AppError(
                'You are not authorized to update this video',
                StatusCodes.UNAUTHORIZED
            )
        );
    }

    video.title = title;
    video.description = description;
    video.published = published;

    await video.save();

    res.status(StatusCodes.OK).json({
        message: 'Video updated successfully',
        data: video,
    });
});

export const findVideosHandler = expressAsyncHandler(async (req, res, next) => {
    const videos = await getVideos();

    res.status(StatusCodes.OK).json({
        message: 'Videos found successfully',
        data: videos,
    });
});
