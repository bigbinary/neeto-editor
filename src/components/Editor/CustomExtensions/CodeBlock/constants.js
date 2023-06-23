import { lowlight } from "lowlight";

export const SORTED_LANGUAGE_LIST = lowlight
  .listLanguages()
  .sort()
  .unshift("auto");
