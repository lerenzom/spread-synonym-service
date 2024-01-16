import {isMainThread, parentPort} from 'worker_threads';
import {Word} from "../model/word";

export enum Commands {
    GET_SYNONYMS,
    ADD_SYNONYMS
}

if (!isMainThread) {
    parentPort.on("message", ({searchTerm, words, command, a, b}: {searchTerm?: string, words?: Map<string, Word>, command: Commands, a?: string, b?: string}) => {
        switch (command) {
            case Commands.GET_SYNONYMS:
                parentPort.postMessage({
                    word: searchTerm,
                    synonyms: getSynonyms(searchTerm, words)
                });
            case Commands.ADD_SYNONYMS:
                parentPort.postMessage({
                    word: searchTerm,
                    words: addSynonyms(a, b, words)
                });
        }
    });
}

export const addSynonyms = (a: string, b: string, words: Map<string, Word>): Map<string, Word> => {
    if (!words.has(a)) words.set(a, new Word(a))
    if (!words.has(b)) words.set(b, new Word(b))

    const wordA = words.get(a)
    const wordB = words.get(b)

    if (!wordA.synonyms.has(b)) wordA.synonyms = new Set([...wordA.synonyms, b])
    if (!wordB.synonyms.has(a)) wordB.synonyms = new Set([...wordB.synonyms, a])
    return words
}

export const getSynonyms = (searchTerm: string, words: Map<string, Word>) => {
    if(!words.has(searchTerm)) return []

    const root = words.get(searchTerm)
    const queue = [root];
    const visited = new Set([root.word]);
    const returnSet = new Set<string>()

    while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of node.synonyms) {
            if (visited.has(neighbor)) continue;
            const neighborWord = words.get(neighbor)
            queue.push(neighborWord);
            visited.add(neighborWord.word); // prevent infinite cycle
        }

        if (node !== root) returnSet.add(node.word)
    }
    return returnSet
}