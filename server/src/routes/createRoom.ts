import { Router } from 'express';

import { Tables } from '../interfaces/airtable.interface';
import { AirtableService } from '../lib/airtable.service';

const router = Router();
const airtable = new AirtableService();

router.post('/', async (req, res, next) => {
    const name = req.body.name;
    const response = await airtable.createRoom(name);
    res.json({code: 200, data: {
        roomId: response
    }});
    res.end();
})

module.exports = router;
