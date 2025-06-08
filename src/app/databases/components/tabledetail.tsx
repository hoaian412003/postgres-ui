'use client'

import { runSql } from "@/actions/sql";
import { useTabsStore } from "@/store/tabs";
import { ColumnMetadata } from "@/types/column"
import { useEffect, useMemo, useState } from "react";
import { SqlResult } from "./sqlresult";
import { FaRegPlayCircle } from "react-icons/fa";


type Props = {
  columns: Record<string, ColumnMetadata[]>;
  database: string;
}

export const TableDetail: React.FC<Props> = ({ columns, database }) => {
  const { getCurrentTab } = useTabsStore();
  const { title } = getCurrentTab();
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const sql = `SELECT ${columns[title].map((c: any) => `${title}."${c.name}"`).join(", ")} FROM "${title}";`

  useEffect(() => {

    setLoading(true);
    runSql(sql, database).then(({ result, error }) => {
      setResult(result);
      setError(error);
    }).finally(() => {
      setLoading(false)
    })

  }, [title])

  return <div className="p-4 bg-gray-100 h-full rounded-lg flex flex-col gap-2">

    <label className="input w-full p-4">

      <FaRegPlayCircle size={18} />

      <p className="font-sans">
        SELECT {columns[title].map((c, index) => (
          <span key={index} className="text-rose-800 font-bold">{c.name}{index !== columns[title].length - 1 ? "," : " "} </span>
        ))} FROM <span className="font-bold">{title}</span>
      </p>
    </label>

    <div className="flex-1">
      <SqlResult error={error} result={result} loading={loading} />
    </div>
  </div>
}
