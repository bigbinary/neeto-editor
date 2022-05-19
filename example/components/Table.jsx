import React from "react";
import classNames from "classnames";

const Table = ({ columns, rows = [], className }) => {
  return (
    <table
      className={classNames(
        "block min-w-full border border-gray-200 overflow-x-auto",
        {
          [className]: className,
        }
      )}
    >
      {columns?.length ? (
        <thead>
          <tr>
            {columns.map((columnData) => (
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                {columnData}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody className="text-sm bg-white divide-y divide-gray-200">
        {rows.map((row) =>
          row?.length ? (
            <tr>
              {row.map((rowData) => (
                <td className="px-6 py-2 whitespace-nowrap">{rowData}</td>
              ))}
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
};

export default Table;
