'use client'

import { Editor } from "@monaco-editor/react"
import { CirclePlay } from "lucide-react";
import React, { useState } from "react";
import { checkAuthority, extractColumns } from '@/utils/extractColumn';
import { useParams } from "next/navigation";
import { useTabsStore } from "@/store/tabs";
import Split from 'react-split';
import { SqlResult } from "./sqlresult";
import { runSql } from "@/actions/sql";


type Props = {
  content: string;
  onChange?: (value: string) => void;
}

export const SqlEditor: React.FC<Props> = ({ content, onChange }) => {

  const [value, setValue] = React.useState(content);
  const { database } = useParams();
  const { currentTabIndex, updateSqlScript } = useTabsStore();
  const [error, setError] = useState<any>();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(false);
  const onValueChange = (value: string | undefined) => {
    setValue(value ?? "");
    updateSqlScript(currentTabIndex, value || "")
    if (onChange) {
      onChange(value ?? "");
    }
  }

  const onRunSql = async () => {
    setLoading(true);
    const { result, error } = await runSql(value, database as string);
    setResult(result);
    setError(error);
    setLoading(false);
  }

  return <div className="flex flex-col position-relative flex-1 max-h-full">

    <button onClick={onRunSql} className="btn btn-primary position-relative w-30 btn-sm mb-2 ml-auto">
      <CirclePlay size={20} /> Run SQL
    </button>

    <Split
      sizes={[30, 70]}
      direction="vertical"
      className="position-relative flex-col flex-1 max-h-full"
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}

    >
      <Editor
        height="100%"
        defaultLanguage="sql"
        value={value}
        onChange={onValueChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: 'on',
        }}
      />
      <SqlResult result={result} error={error} loading={loading} />
    </Split>
  </div >
}
