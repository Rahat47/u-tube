import fs from 'fs-extra';
import busboy from 'busboy';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import AppError from '../../utils/appError';
import { Video } from './video.model';
import {
    createVideo,
    deleteVideo,
    findVideo,
    getVideos,
} from './video.service';
import { UpdateVideoBody, UpdateVideoParams } from './video.schema';
import logger from '../../utils/logger';

const MIME_TYPES = ['video/mp4'];
const CHUNK_SIZE = 1000000; // 1MB

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
            await deleteVideo(video.videoId);
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

    bb.on('error', async () => {
        await deleteVideo(video.videoId);
        return next(
            new AppError(
                'Error uploading video',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        );
    });

    return req.pipe(bb);
};

export const streamVideoHandler: RequestHandler = async (req, res, next) => {
    const { videoId } = req.params;

    const { range } = req.headers;
    if (!range) {
        return next(
            new AppError('Range header is required', StatusCodes.BAD_REQUEST)
        );
    }

    const video = await findVideo(videoId);

    if (!video) {
        return next(new AppError('Video not found', StatusCodes.NOT_FOUND));
    }

    const filePath = getPath({
        videoId,
        extension: video.extension,
    });

    const fileSize = fs.statSync(filePath).size;

    const chunkStart = Number(range.replace(/\D/g, ''));
    const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, fileSize - 1);

    const contentLength = chunkEnd - chunkStart + 1;
    const headers = {
        'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': `video/${video.extension}`,
        // "Cross-Origin-Resource-Policy": "cross-origin",
    };

    res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

    const stream = fs.createReadStream(filePath, {
        start: chunkStart,
        end: chunkEnd,
    });

    stream.pipe(res);
};

export const updateVideoHandler = asyncHandler<
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

export const findVideosHandler = asyncHandler(async (req, res, next) => {
    const { query } = req;

    const videos = await getVideos(query);

    res.status(StatusCodes.OK).json({
        message: 'Videos found successfully',
        data: videos,
    });
});

export const deleteVideoHandler = asyncHandler<UpdateVideoParams>(
    async (req, res, next) => {
        const { videoId } = req.params;
        const { _id: userId } = res.locals.user;

        const video = await findVideo(videoId);

        if (!video) {
            return next(new AppError('Video not found', StatusCodes.NOT_FOUND));
        }

        if (video.owner!.toString() !== userId) {
            return next(
                new AppError(
                    'You are not authorized to delete this video',
                    StatusCodes.UNAUTHORIZED
                )
            );
        }
        // delete the video from the file system
        const filePath = getPath({
            videoId: video.videoId,
            extension: video.extension,
        });

        try {
            await fs.unlink(filePath);
            logger.info(`Video ${video.videoId} deleted from file system`);

            await deleteVideo(video.videoId);
            logger.info(`Video ${video.videoId} deleted from database`);

            res.status(StatusCodes.OK).json({
                message: 'Video deleted successfully',
                data: null,
            });
        } catch (error) {
            logger.error(`Error deleting video ${video.videoId}`, error);
            return next(
                new AppError(
                    'Error deleting video, please try again later',
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            );
        }

        // fs.unlink(filePath, async (err) => {
        //     if (err) {
        //         logger.error(err);
        //         return next(
        //             new AppError(
        //                 'Error deleting video',
        //                 StatusCodes.INTERNAL_SERVER_ERROR
        //             )
        //         );
        //     }

        //     // delete the video from the database
        //     await deleteVideo(video.videoId);
        //     logger.info('Video deleted successfully');

        //     res.status(StatusCodes.OK).json({
        //         message: 'Video deleted successfully',
        //         data: null,
        //     });
        // });
    }
);
