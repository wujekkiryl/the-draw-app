import { Router } from 'express';
import { Person } from '../interfaces/airtable.interface';

import { AirtableService } from '../lib/airtable.service';


const router = Router();
const airtable = new AirtableService();

router.post('/', async (req, res, next) => {
    const person: Person = {
        name: req.body.name,
        room_id: req.body.roomId,
    };
    const response = await airtable.addPerson(person);
    res.json({code: 200, data: response});
    res.end();
})

module.exports = router;
