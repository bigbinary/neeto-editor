const buildLinkSVG = () => {
  const svgNS = "http://www.w3.org/2000/svg";

  const svgWrapper = document.createElement("span");
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "20");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
  );

  svg.appendChild(path);
  svgWrapper.appendChild(svg);

  return svgWrapper;
};

const convertTextToId = text =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

export const makeHeadingsNavigable = editorContentNode => {
  const headerTags = editorContentNode.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );

  headerTags.forEach(heading => {
    const headingId = convertTextToId(heading.textContent);
    heading.setAttribute("id", headingId);

    const anchor = document.createElement("a");
    anchor.setAttribute("href", `#${headingId}`);
    anchor.classList.add("header-wrapper-link");
    anchor.appendChild(buildLinkSVG());
    anchor.appendChild(heading.cloneNode(true));

    heading.replaceWith(anchor);
  });
};
