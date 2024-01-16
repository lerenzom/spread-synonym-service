import {Router} from 'express'
import {addSynonymsWorker, getSynonymsWorker, hasWord} from "../service/synonym.service";

const router = Router();

router.post('/add', async function (req, res, next) {
    const a = req.query.a.toString()
    const b = req.query.b.toString()
    await addSynonymsWorker(res, a, b)
});

router.get('/search', async function (req, res, next) {
    const word = req.query.word
    if (!hasWord(word.toString()))
        res.status(404).json({message: "Not found"})
    else
        await getSynonymsWorker(res, word.toString());
});

export default router;
