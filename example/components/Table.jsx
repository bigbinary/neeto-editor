import React from "react";
import classNames from "classnames";

const Table = ({ columns, rows = [], className }) => {
  return (
    <table
      className={classNames(
        "block min-w-full overflow-x-auto border border-gray-200",
        {
          [className]: className,
        }
      )}
    >
      {columns?.length ? (
        <thead>
          <tr>
            {columns.map(columnData => (
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {columnData}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody className="divide-y divide-gray-200 bg-white text-sm">
        {rows.map(row =>
          row?.length ? (
            <tr>
              {row.map(rowData => (
                <td className="whitespace-nowrap px-6 py-2">{rowData}</td>
              ))}
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
};

export default Table;
