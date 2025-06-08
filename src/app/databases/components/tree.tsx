'use client';
import { FiDatabase } from "react-icons/fi";
import { CiViewTable } from "react-icons/ci";
import { FiColumns } from "react-icons/fi";
import { ColumnMetadata } from "@/types/column";
import { getPostgresTypeIcon } from "@/components/TableSchemaNode";
import { useTabsStore } from "@/store/tabs";


type Props = {
  tables: Record<string, ColumnMetadata[]>;
  databaseName: string;
}

export const Tree: React.FC<Props> = ({
  tables,
  databaseName
}) => {
  const { upsertTableDetailTab } = useTabsStore();
  return <div>
    <div className="text-sm font-bold mt-4 flex items-center gap-2">
      <FiDatabase /> Tables
    </div>
    <ul className="menu menu-xs rounded-box max-w-xs w-full">
      <li className="border-gray-300 border-l">
        {Object.keys(tables).map((table, index) => (
          <details key={index} className="menu-title text-bold text-black">
            <summary className="text-sm" onClick={() => upsertTableDetailTab(table)}>
              <CiViewTable />
              {table}
            </summary>
            <ul className="p-2">
              {tables[table].map((column, colIndex) => (
                <li key={colIndex} className="mt-1 text-black">
                  <div className="text-sm">
                    {getPostgresTypeIcon(column.type, 12)}
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
