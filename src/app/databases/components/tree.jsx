'use client';
import { FiDatabase } from "react-icons/fi";
import { CiViewTable } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";




export const Tree = ({
  tableColumns,
  databaseName
}) => {
  return <div>
    <div className="text-lg font-bold mt-4 flex items-center gap-2">
      <FiDatabase /> {databaseName}
    </div>
    <ul className="menu menu-xs rounded-box max-w-xs w-full">
      <li className="border-gray-300 border-l">
        {Object.keys(tableColumns).map((table, index) => (
          <details key={index} className="menu-title text-bold text-black">
            <summary className="text-lg">
              <CiViewTable />
              {table}
            </summary>
            <ul className="p-2">
              {tableColumns[table].map((column, colIndex) => (
                <li key={colIndex} className="mt-1 text-black">
                  <div className="text-lg">
                    <FiColumns />
                    {column.name}
                  </div>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </li>
    </ul>

  </div>
}
