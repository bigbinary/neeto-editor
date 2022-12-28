export const validFileName = name =>
  /^[a-zA-Z0-9.\s]+.(jpg|jpeg|png|gif|mp4|pdf|xls|xlsx|csv)$/.test(name)
    ? ""
    : "File type is not permitted";
