import {Router} from 'express'
import {addSynonymsWorker, getSynonymsWorker, hasWord} from "../service/synonym.service";

const router = Router();

router.post('/add', async function (req, res, next) {
    const a = req.query.a
    const b = req.query.b
    if (!a || !b)
        return res.status(400).send({message: "Bad Request"})
    else
        return res.status(200).json(await addSynonymsWorker(res, a.toString(), b.toString()))
});

router.get('/search', async function (req, res, next) {
    const word = req.query.word
    if (!hasWord(word.toString()))
        return res.status(404).json({message: "Not found"})
    else
        return res.status(200).json(await getSynonymsWorker(req.query.word.toString()))
});

export default router;
