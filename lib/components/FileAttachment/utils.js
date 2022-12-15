import { ALLOWED_FILE_TYPES } from "./constant";

export const isValidFileName = name =>
  /^\w+.(jpg|jpeg|png|gif|mp4|pdf|xls|xlsx|csv)$/.test(name);

export const getInvalidFileTypeErrorMessage = () =>
  `File type is not permitted. Allowed file types are  ${ALLOWED_FILE_TYPES.join(
    ", "
  )} .`;
