import {
  EDITOR_METHODS_TABLE_COLUMNS,
  EDITOR_METHODS_TABLE_ROWS,
  EDITOR_COMMANDS_TABLE_COLUMNS,
  EDITOR_COMMANDS_TABLE_ROWS,
} from "./constants";

export const Table = ({ columns, rows, className }) => (
  <table
    className={`block min-w-full overflow-x-auto border border-gray-200 ${className}`}
  >
    {columns?.length ? (
      <thead>
        <tr>
          {columns.map((columnData, idx) => (
            <th
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              key={idx}
            >
              {columnData}
            </th>
          ))}
        </tr>
      </thead>
    ) : null}
    <tbody className="text-sm bg-white divide-y divide-gray-200">
      {rows.map(row =>
        rows?.length ? (
          <tr>
            {row.map((rowData, idx) => (
              <td className="px-6 py-2 whitespace-nowrap" key={idx}>
                {rowData}
              </td>
            ))}
          </tr>
        ) : null
      )}
    </tbody>
  </table>
);

export const MethodsTable = () => (
  <Table
    columns={EDITOR_METHODS_TABLE_COLUMNS}
    rows={EDITOR_METHODS_TABLE_ROWS}
  />
);
export const CommandsTable = () => (
  <Table
    columns={EDITOR_COMMANDS_TABLE_COLUMNS}
    rows={EDITOR_COMMANDS_TABLE_ROWS}
  />
);
