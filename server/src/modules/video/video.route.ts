import express from 'express';
import requireUser from '../../middlewares/requireUser';
import {
    findVideosHandler,
    updateVideoHandler,
    uploadVideoHandler,
} from './video.controller';

const router = express.Router();

router.post('/', requireUser, uploadVideoHandler);
router.get('/', findVideosHandler);
router.patch('/:videoId', requireUser, updateVideoHandler);

export default router;
