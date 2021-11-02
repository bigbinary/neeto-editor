export function getItemLabel(item) {
  if (typeof item === "string") {
    return item;
  } else if (typeof item === "object" && item.label !== undefined) {
    return item.label;
  } else JSON.stringify(item);
}

export function getItemKey(item) {
  if (typeof item === "string") {
    return item;
  } else if (typeof item === "object" && item.key !== undefined) {
    return item.key;
  } else JSON.stringify(item);
}
