import React from "react";

import { NodeViewWrapper } from "@tiptap/react";
import ToolTip from "components/Common/ToolTip";
import { Plus } from "neetoicons";

const TableComponent = () => (
  <NodeViewWrapper>
    <div className="neeto-editor-table">
      <table>
        <thead>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
            <th>Col3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
            <td>Cell 3</td>
          </tr>
          <tr>
            <td>Cell 4</td>
            <td>Cell 5</td>
            <td>Cell 6</td>
          </tr>
        </tbody>
      </table>
      <ToolTip content="Click to add a new row" position="bottom">
        <div className="neeto-editor-table__add-row">
          <Plus size={16} />
        </div>
      </ToolTip>
    </div>
  </NodeViewWrapper>
);

export default TableComponent;
