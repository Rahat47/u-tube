import busboy from 'busboy';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import { RequestHandler } from 'express';
import AppError from '../../utils/appError';
import { Video } from './video.model';
import { createVideo } from './video.service';

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
