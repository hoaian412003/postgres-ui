'use client';

import { ColumnMetadata } from "@/types/column";
import { Tree } from "./tree"
import { useRouter } from "next/navigation";

type Props = {
  tables: Record<string, ColumnMetadata[]>;
  currentDatabase: string;
  databases: string[];
}

export const Left: React.FC<Props> = ({ tables, currentDatabase, databases }) => {

  const router = useRouter();
  const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDatabase = event.target.value;
    router.push(`/databases/${selectedDatabase}`);
  };

  return <div>
    <select className="select select-sm font-bold" defaultValue={currentDatabase} onChange={handleDatabaseChange}>
      {databases.map((db, index) => (
        <option key={index} value={db}>
          {db}
        </option>
      ))}
    </select>

    <Tree tables={tables} databaseName={currentDatabase} />
  </div>
}
