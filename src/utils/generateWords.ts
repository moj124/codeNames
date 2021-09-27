export function generateWords(words: string[], turn: boolean): string[][] {
  const arr: string[] = [];

  while (arr.length < 25) {
    const idx = Math.floor(Math.random() * words.length);
    if (!arr.includes(words[idx])) {
      arr.push(words[idx]);
    }
  }

  return arr.map((element, index) => [
    element,
    index < 7
      ? "blackblack"
      : index < 15
      ? "blackred"
      : index < 23
      ? "blackblue"
      : index < 24
      ? "blackgray"
      : !turn
      ? "blackred"
      : "blackblue",
  ]);
}
