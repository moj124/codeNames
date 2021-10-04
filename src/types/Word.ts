import { Color } from "./Color";

export interface Word {
  word_id: number;
  word: string;
  color: Color;
  ishidden: boolean;
}
