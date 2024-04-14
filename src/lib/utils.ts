import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const noteMapping: { [key: number]: string } = {
  1: "C",
  2: "C#",
  3: "D",
  4: "D#",
  5: "E",
  6: "F",
  7: "F#",
  8: "G",
  9: "G#",
  10: "A",
  11: "A#",
  12: "B",
};

const keys: string[] = [
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
];
// export const keyMap: { [key: string]: string } = {};

// set notes to keys
export function setNotesToKeys(notes: number[]) {
  const keyMap: { [key: string]: string } = {};
  const noteArray = numsToNotes(notes);

  for (let i = 0; i < keys.length; i++) {
    const octave = 3 + Math.floor(i / notes.length);
    // keyMap[keys[i]] = noteMapping[notes[i % notes.length]] + octave.toString();
    keyMap[keys[i]] = noteArray[i % noteArray.length] + octave.toString();
  }

  console.log("keyMap at setNotes...:", keyMap);
  return keyMap;
}

export function numsToNotes(numArray: number[]) {
  const notes: string[] = [];

  numArray.forEach((number) => {
    notes.push(noteMapping[number]);
  });

  return notes;
}
