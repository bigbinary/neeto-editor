import { CALLOUT_TYPES } from "./constants.js";

export const isValidCalloutType = type =>
  Object.keys(CALLOUT_TYPES).includes(type);

export const getCalloutConfig = type =>
  CALLOUT_TYPES[type] || CALLOUT_TYPES.default;

export const getDefaultCalloutAttributes = (type = "default") => {
  const config = getCalloutConfig(type);

  return { type, emoji: config.emoji };
};
