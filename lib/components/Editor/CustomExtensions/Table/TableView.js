class TableView {
  constructor(node, cellMinWidth) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    this.dom = document.createElement("div");
    this.wrapper = document.createElement("div");
    this.table = document.createElement("table");
    this.colgroup = document.createElement("colgroup");
    this.contentDOM = document.createElement("tbody");
    this.build();
  }

  build() {
    this.dom.className = "neeto-editor-table";
    this.wrapper.className = "neeto-editor-table__wrapper";

    this.dom.appendChild(this.wrapper);
    this.wrapper.appendChild(this.table);
    this.table.appendChild(this.colgroup);
    this.table.appendChild(this.contentDOM);
    this.wrapper.appendChild(
      this.buildController({ className: "neeto-editor-table__add-column" })
    );
    this.dom.appendChild(
      this.buildController({ className: "neeto-editor-table__add-row" })
    );

    this.resizeColumns();
  }

  buildController({ className = "" }) {
    const controller = document.createElement("div");
    const icon = document.createElement("p");
    controller.className = className;
    icon.textContent = "+";
    controller.appendChild(icon);
    return controller;
  }

  resizeColumns = () => {
    let totalWidth = 0;
    let fixedWidth = true;
    let nextDOM = this.colgroup.firstChild;
    const row = this.node.firstChild;

    for (let i = 0, col = 0; i < row.childCount; ++i) {
      const { colspan, colwidth } = row.child(i).attrs;

      for (let j = 0; j < colspan; j += 1, col += 1) {
        const hasWidth = colwidth && colwidth[j];
        const cssWidth = hasWidth ? `${hasWidth}px` : "";
        totalWidth += hasWidth || this.cellMinWidth;

        if (!hasWidth) fixedWidth = false;

        if (!nextDOM) {
          this.colgroup.appendChild(document.createElement("col")).style.width =
            cssWidth;
        } else {
          if (nextDOM.style.width !== cssWidth) {
            nextDOM.style.width = cssWidth;
          }
          nextDOM = nextDOM.nextSibling;
        }
      }
    }

    while (nextDOM) {
      const after = nextDOM.nextSibling;
      nextDOM.parentNode.removeChild(nextDOM);
      nextDOM = after;
    }

    if (fixedWidth) {
      this.table.style.width = `${totalWidth}px`;
      this.table.style.minWidth = "";
    } else {
      this.table.style.width = "";
      this.table.style.minWidth = `${totalWidth}px`;
    }
  };
}

export default TableView;
