const Table = ({ columns, rows, className }) => (
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

export default Table;
