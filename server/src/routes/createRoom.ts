import { Router } from 'express';
import { randomBytes } from 'crypto';

const router = Router();

router.get('/a', (req, res, next) => {
    const id = randomBytes(20).toString('hex');
    res.json({code: 200, data: {id}});
    res.end();
})

module.exports = router;
