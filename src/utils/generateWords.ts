import { Color } from "../types/Color";
export function generateWords(
  words: string[],
  turn: boolean
): { word: string; color: Color; ishidden: boolean }[] {
  const arr: string[] = [];

  while (arr.length < 25) {
    const idx = Math.floor(Math.random() * words.length);
    if (!arr.includes(words[idx])) {
      arr.push(words[idx]);
    }
  }

  return arr.map((element, index) => {
    const newObj: { word: string; color: Color; ishidden: boolean } = {
      word: "",
      color: Color.Black,
      ishidden: true,
    };
    newObj.word = element;
    newObj.color =
      index < 7
        ? Color.Black
        : index < 15
        ? Color.Red
        : index < 23
        ? Color.Blue
        : index < 24
        ? Color.Gray
        : !turn
        ? Color.Red
        : Color.Blue;
    return newObj;
  });
}
