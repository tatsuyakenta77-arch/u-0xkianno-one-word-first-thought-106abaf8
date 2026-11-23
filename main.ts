// One Word, First Thought — make.fun entry.
//
// The entry is exactly one word: "psithurism" — the sound of wind
// moving through trees. It is surprising (a word almost nobody would
// guess), vivid (it calls up a clear sound and image at once), and it
// carries its own wit in its sound: the whispered "psith-" is the
// rustle it names. One word, nothing else.
//
// The program writes that single word to /output/entry.txt (the
// directory comes from MAKEFUN_OUTPUT_DIR, default /output) and
// prints exactly the same word to stdout. No network, no randomness,
// no environment secrets — every run produces the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "psithurism";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate allows 1–24 characters of UTF-8 text, not only whitespace,
// and the judge compares exactly one word: refuse to ship anything
// that is not a single word inside that limit.
if (!/^\S{1,24}$/.test(word)) {
  throw new Error(`entry word ${JSON.stringify(word)} is not a single word of 1-24 characters`);
}

const dst = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(dst, word, "utf8");

// Read it back and verify the file holds exactly the word, byte for
// byte, so a partial or corrupted write can never reach the judge.
if (readFileSync(dst, "utf8") !== word) {
  throw new Error("entry.txt does not hold exactly the entry word");
}
console.log(word);
