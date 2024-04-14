import { useEffect, useState } from "react";
import * as Tone from "tone";
import { numsToNotes, setNotesToKeys } from "../lib/utils";

interface KeyboardProps {
  notes: number[];
}

export function KeyboardSynth({ notes }: KeyboardProps) {
  const synth = new Tone.PolySynth().toDestination();
  const [keyMap, setKeyMap] = useState<{ [key: string]: string }>({});

  console.log("keyMap at start:", keyMap);

  useEffect(() => {
    const newKeyMap = setNotesToKeys(notes);
    setKeyMap(newKeyMap);

    const handleKeyDown = (event: KeyboardEvent) => {
      playNote(event.key, newKeyMap);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      console.log("Key released:", event.key);
      stopNote(event.key, newKeyMap);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const playNote = (key: string, keyMap: { [key: string]: string }) => {
    console.log("keyMap at playNote:", keyMap);

    const note = keyMap[key.toLowerCase()];
    if (note) {
      // Start the new note
      synth.triggerAttack(note);
      // Add the note to the array of playing notes
      console.log("note: " + note);
    }
  };

  const stopNote = (key: string, keyMap: { [key: string]: string }) => {
    const note = keyMap[key.toLowerCase()];
    console.log("ENTERED STOP. note = " + note);
    if (note) {
      console.log("ENTERED IF AT STOP. note = " + note);
      // Stop the note
      synth.triggerRelease(note);
    } else {
      console.log("invalid note: " + note);
    }
  };

  return (
    <div>
      {numsToNotes(notes).map((note) => {
        return `${note} `;
      })}
    </div>
  );
}
