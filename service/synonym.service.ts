import {Worker} from "worker_threads";
import {Response} from "express-serve-static-core";
import {Commands} from "./synonym.worker";
import {Word} from "../model/word";


// We replace this value when adding synonyms instead of mutating the object
let words = new Map<string, Word>()

export async function getSynonymsWorker(word: string) {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./service/synonym.worker")
        worker.on("message", async (data) => {
            await worker.terminate()
            resolve({synonyms: [...data.synonyms]})
        });
        worker.postMessage({command: Commands.GET_SYNONYMS, searchTerm: word.toString(), words})
    })

}

export async function addSynonymsWorker(res: Response, a: string, b: string) {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./service/synonym.worker")
        worker.on("message", async (data) => {
            words = data.words //copy new words object instead of mutating in place
            await worker.terminate()
            resolve({message: "ok"})
        });
        worker.postMessage({command: Commands.ADD_SYNONYMS, a, b, words})
    })

}

export const hasWord = (a: string) => words.has(a)

