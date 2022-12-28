export const validFileName = name =>
  /^\w+.(jpg|jpeg|png|gif|mp4|pdf|xls|xlsx|csv)$/.test(name)
    ? ""
    : "File type is not permitted";
