'use client';

import { useMemo, useState } from "react"
import { Header } from "./header";
import { Left } from "./left";
import { Overview } from "./overview";
import { ReactFlowProvider } from "@xyflow/react";


type Props = {
  data: any;
  relations: Record<string, { source: string, target: string }[]>;
}

export const View: React.FC<Props> = (
  { data, relations }
) => {


  const databases = useMemo(() => {
    return Object.keys(data);
  }, [data])

  console.log("Relations: ", relations)

  const [currentDatabase, setCurrentDatabase] = useState(databases[0] || '');

  return <div className="flex flex-col flex-1 h-full">
    <Header databases={databases as any} />
    <div className="flex flex-1 h-full">
      <Left tableColumns={data[currentDatabase] as any} databaseName={currentDatabase} />
      <ReactFlowProvider>
        <Overview data={data[currentDatabase]} relations={relations[currentDatabase]} />
      </ReactFlowProvider>
    </div>
  </div>
}
