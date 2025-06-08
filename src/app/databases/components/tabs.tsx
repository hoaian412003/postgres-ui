'use client';

import { Overview } from "./overview";
import { ColumnMetadata } from "@/types/column";
import { ReactFlowProvider } from "@xyflow/react";
import { useTabsStore } from "@/store/tabs";
import { SqlEditor } from "./sqleditor";
import { TableDetail } from "./tabledetail";

type Props = {
  data: Record<string, ColumnMetadata[]>;
  relations: { source: string, target: string }[];
  database: string;
}

export const Tabs: React.FC<Props> = ({ data, relations, database }) => {
  const { currentTabIndex, getCurrentTab } = useTabsStore();


  if (currentTabIndex === 0) {
    return <ReactFlowProvider>
      <Overview data={data} relations={relations} />
    </ReactFlowProvider>
  }

  const currentTab = getCurrentTab();
  if (currentTab.Icon === 'SQL') {
    return <SqlEditor content={currentTab.content || ""} />
  }

  return <TableDetail columns={data} database={database} />
}
