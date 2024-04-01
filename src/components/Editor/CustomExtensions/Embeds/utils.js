import {
  YOUTUBE_URL_REGEXP,
  VIMEO_URL_REGEXP,
  LOOM_URL_REGEXP,
  NEETO_RECORD_URL_REGEXP,
} from "common/constants";

export const validateUrl = url =>
  url
    ? validateNeetoRecordUrl(url) ||
      validateYouTubeUrl(url) ||
      validateLoomUrl(url) ||
      validateVimeoUrl(url)
    : false;

export const validateYouTubeUrl = url => {
  const match = url.match(YOUTUBE_URL_REGEXP);

  return match && `https://www.youtube.com/embed/${match[5]}`;
};

export const validateVimeoUrl = url => {
  const match = url.match(VIMEO_URL_REGEXP);

  return match && `https://player.vimeo.com/video/${match[4]}?h=${match[5]}`;
};

export const validateLoomUrl = url => {
  const match = url.match(LOOM_URL_REGEXP);

  return match && `https://www.loom.com/embed/${match[4]}?t=${match[5] || ""}`;
};

export const validateNeetoRecordUrl = url => {
  const match = url.match(NEETO_RECORD_URL_REGEXP);

  return match && url.replace("watch", "embeds");
};
