export const isMarkActive = (state, type) => {
  const { empty, ranges } = state.selection;
  if (empty) {
    return !!type?.isInSet(state.storedMarks || state.selection.$from.marks());
  }

  for (let i = 0; i < ranges.length; i++) {
    const { $from, $to } = ranges[i];
    let found = false;
    state.doc.nodesBetween($from.pos, $to.pos, node => {
      if (found) return false;
      found = type?.isInSet(node.marks);

      return !found;
    });
    if (found) return true;
  }

  return false;
};
