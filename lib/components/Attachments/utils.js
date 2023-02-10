import { mergeRight } from "ramda";

import { DEFAULT_UPPY_CONFIG } from "./constants";

export const buildUppyConfig = restrictions =>
  mergeRight(DEFAULT_UPPY_CONFIG, { restrictions });
