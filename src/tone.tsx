import { useEffect } from "react";
import * as Tone from "tone";

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

const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "q", "w", "e", "r"];
const keyMap: { [key: string]: string } = {};

// set notes to keys
function setNotesToKeys(notes: number[]) {
  //map each note to keys on the keyboard
  let octave = 4;

  for (let i = 0; i < notes.length; i++) {
    keyMap[keys[i]] = noteMapping[notes[i]] + octave.toString();
  }
}

const testNotes = [1, 2, 4, 5, 7, 10, 12];
setNotesToKeys(testNotes);

console.log(keyMap);

export function KeyboardSynth() {
  const synth = new Tone.Synth().toDestination();

  useEffect(() => {
    const playNote = (key: string) => {
      const note = keyMap[key.toLowerCase()];
      if (note) {
        synth.triggerAttackRelease(note, "8n");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      playNote(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Play</div>;
}
