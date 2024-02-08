import React from "react";

const Table = ({ columns, rows }) => (
  <>
    <style>
      {`
        /* Table Styles */
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #e2e8f0;
        }

        /* Header Styles */
        .table-header {
          padding: 12px;
          background-color: #f7fafc;
          text-align: left;
          font-size: 0.75rem;
          font-weight: bold;
          color: #4a5568;
        }

        /* Row Styles */
        .table-row:hover {
          background-color: #edf2f7;
        }

        /* Cell Styles */
        .table-cell {
          padding: 12px;
          font-size: 0.875rem;
          color: #2d3748;
          border-bottom: 1px solid #e2e8f0;
        }
      `}
    </style>
    <table className="custom-table">
      {columns?.length ? (
        <thead>
          <tr>
            {columns.map((columnData, idx) => (
              <th className="table-header" key={idx}>
                {columnData}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((row, idx) =>
          rows?.length ? (
            <tr className="table-row" key={idx}>
              {row.map((rowData, idx) => (
                <td className="table-cell" key={idx}>
                  {rowData}
                </td>
              ))}
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  </>
);

export default Table;
