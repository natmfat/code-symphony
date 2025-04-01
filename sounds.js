import * as Tone from "tone";

const types = [
  "Program",
  "ImportDeclaration",
  "ImportSpecifier",
  "Identifier",
  "Literal",
  "FunctionDeclaration",
  "AssignmentPattern",
  "BlockStatement",
  "VariableDeclaration",
  "VariableDeclarator",
  "AwaitExpression",
  "CallExpression",
  "MemberExpression",
  "IfStatement",
  "BinaryExpression",
  "UnaryExpression",
  "ReturnStatement",
  "ArrowFunctionExpression",
];

// build sounds list
// https://www.guitarland.com/MusicTheoryWithToneJS/PlayMajorScale.html
const notes = "B3,C#4,D#4,E4,F#4,G#4,A#4,B4".split(","); // Eb major
const sounds = {};
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
for (let i = 0; i < types.length; i++) {
  const type = types[i];
  const note = notes[i % notes.length];

  sounds[type] = (level, when) => {
    const duration = Math.max(Math.min(level, 8), 1) + "n";
    synth.triggerAttackRelease(note, duration, when);
  };
}

export { sounds, synth };
