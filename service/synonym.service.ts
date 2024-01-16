import {Worker} from "worker_threads";
import {Response} from "express-serve-static-core";
import {Commands} from "./synonym.worker";
import {Word} from "../model/word";



let words = new Map<string, Word>()

export async function getSynonymsWorker(res: Response, word: string) {
    const worker = new Worker("./service/synonym.worker")
    worker.on("message", async (data) => {
        res.status(200).json({synonyms: [...data.synonyms]})
        await worker.terminate()
    });
    worker.postMessage({searchTerm: word.toString(), words, command: Commands.GET_SYNONYMS})
}

export async function addSynonymsWorker(res: Response, a: string, b: string) {
    const worker = new Worker("./service/synonym.worker")
    worker.on("message", async (data) => {
        words = data.words //copy new words object instead of mutating in place
        res.status(200).json({message: "ok"})
        await worker.terminate()
    });
    worker.postMessage({command: Commands.ADD_SYNONYMS, a, b, words})
}

export const hasWord = (a: string) => words.has(a)
