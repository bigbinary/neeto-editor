import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import { NodeView } from '@tiptap/pm/view'
import { noop } from 'neetocommons/pure'

export function updateColumns(
  node: ProseMirrorNode,
  colgroup: Element,
  table: Element,
  cellMinWidth: number,
  overrideCol?: number,
  overrideValue?: any,
) {
  
  let totalWidth = 0
  let fixedWidth = true
  let nextDOM = colgroup.firstChild
  const row = node.firstChild

  for (let i = 0, col = 0; i < row.childCount; i += 1) {
    const { colspan, colwidth } = row.child(i).attrs

    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j]
      const cssWidth = hasWidth ? `${hasWidth}px` : ''

      totalWidth += hasWidth || cellMinWidth

      if (!hasWidth) {
        fixedWidth = false
      }

      if (!nextDOM) {
        colgroup.appendChild(document.createElement('col')).style.width = cssWidth
      } else {
        if (nextDOM.style.width !== cssWidth) {
          nextDOM.style.width = cssWidth
        }

        nextDOM = nextDOM.nextSibling
      }
    }
  }

  while (nextDOM) {
    const after = nextDOM.nextSibling

    nextDOM.parentNode.removeChild(nextDOM)
    nextDOM = after
  }

  if (fixedWidth) {
    table.style.width = `${totalWidth}px`
    table.style.minWidth = ''
  } else {
    table.style.width = ''
    table.style.minWidth = `${totalWidth}px`
  }
}

export class TableView implements NodeView {
  node: ProseMirrorNode

  cellMinWidth: number

  dom: Element

  table: Element

  colgroup: Element

  contentDOM: Element

  rowbutton: Element

  icon: Element

  wrapper: Element

  insertRow: () => void

  constructor(node: ProseMirrorNode, cellMinWidth: number) {
    this.node = node
    this.cellMinWidth = cellMinWidth
    this.dom = document.createElement('div')
    this.dom.className = 'neeto-editor-table'
    this.wrapper = this.dom.appendChild(document.createElement('div'))
    this.wrapper.className = 'tableWrapper'
    this.table = this.wrapper.appendChild(document.createElement('table'))
    this.colgroup = this.table.appendChild(document.createElement('colgroup'))
    updateColumns(node, this.colgroup, this.table, cellMinWidth)
    this.wrapper.appendChild(
      this.buildController({
        className: "neeto-editor-table__add-column",
        handleClick: this.insertColumn,
      })
    );
    this.dom.appendChild(
      this.buildController({
        className: "neeto-editor-table__add-row",
        handleClick: () => this.table.insertRow(),
      })
    );
    this.contentDOM = this.table.appendChild(document.createElement('tbody'))
  }

  buildController = ({ className = "", handleClick = noop }) => {
    const controller = document.createElement("div");
    const icon = document.createElement("p");
    controller.className = className;
    controller.onclick = handleClick;
    icon.textContent = "+";
    controller.appendChild(icon);

    return controller;
  };

  insertColumn = () => {
    const cell = document.createElement("td");
    cell.appendChild(document.createElement("p"));
    this.table
      .querySelectorAll("tr:not(:first-child)")
      .forEach(tr => tr.appendChild(cell.cloneNode(true)));
  };

  update(node: ProseMirrorNode) {
    if (node.type !== this.node.type) {
      return false
    }

    this.node = node
    updateColumns(node, this.colgroup, this.table, this.cellMinWidth)

    return true
  }

  ignoreMutation(mutation: MutationRecord | { type: 'selection'; target: Element }) {
    return (
      mutation.type === 'attributes'
      && (mutation.target === this.table || this.colgroup.contains(mutation.target))
    )
  }
}
