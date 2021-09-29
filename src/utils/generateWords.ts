export function generateWords(
  words: string[],
  turn: boolean
): { word: string; color: string; ishidden: boolean }[] {
  const arr: string[] = [];

  while (arr.length < 25) {
    const idx = Math.floor(Math.random() * words.length);
    if (!arr.includes(words[idx])) {
      arr.push(words[idx]);
    }
  }

  return arr.map((element, index) => {
    const newObj: { word: string; color: string; ishidden: boolean } = {
      word: "",
      color: "",
      ishidden: true,
    };
    newObj.word = element;
    newObj.color =
      index < 7
        ? "black"
        : index < 15
        ? "red"
        : index < 23
        ? "blue"
        : index < 24
        ? "gray"
        : !turn
        ? "red"
        : "blue";
    return newObj;
  });
}
