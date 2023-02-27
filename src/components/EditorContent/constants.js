export const EDITOR_CONTENT_CLASSNAME = "neeto-editor-content";

export const SANITIZE_OPTIONS = {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: ["target", "allow", "allowfullscreen", "frameborder"],
};

export const CODE_BLOCK_REGEX = /<pre><code>([\S\s]*?)<\/code><\/pre>/gim;

export const VARIABLE_SPAN_REGEX =
  /<span data-variable="" [^>]*data-label="([^"]+)">{{([^}]+)}}<\/span>/g;
