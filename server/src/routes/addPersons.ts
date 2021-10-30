import { Router } from 'express';


const router = Router();

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.json({code: 200, data: req.body});
    res.end();
})

module.exports = router;
