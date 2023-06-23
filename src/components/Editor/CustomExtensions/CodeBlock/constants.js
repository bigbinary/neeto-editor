import { lowlight } from "lowlight";

export const SORTED_LANGUAGE_LIST = ["auto"].concat(
  lowlight.listLanguages().sort()
);
