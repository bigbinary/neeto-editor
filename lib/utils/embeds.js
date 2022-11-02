import {
  YOUTUBE_URL_REGEXP,
  VIMEO_URL_REGEXP,
  LOOM_URL_REGEXP,
} from "common/constants";

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
