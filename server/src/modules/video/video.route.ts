import express from 'express';
import requireUser from '../../middlewares/requireUser';
import {
    deleteVideoHandler,
    findVideosHandler,
    streamVideoHandler,
    updateVideoHandler,
    uploadVideoHandler,
} from './video.controller';

const router = express.Router();

router.post('/', requireUser, uploadVideoHandler);
router.get('/', findVideosHandler);

router.patch('/:videoId', requireUser, updateVideoHandler);
router.get('/:videoId', streamVideoHandler);
router.delete('/:videoId', requireUser, deleteVideoHandler);

export default router;
