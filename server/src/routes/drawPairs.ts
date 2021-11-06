import { Router } from 'express';

import { Tables } from '../interfaces/airtable.interface';
import { DrawService } from '../lib/draw.service';

const router = Router();
const drawService = new DrawService();

router.post('/', async (req, res, next) => {
    const roomId = req.body.roomId;
    const response = await drawService.drawPairs(roomId);
    res.json({code: 200, data: response });
    res.end();
})

module.exports = router;
