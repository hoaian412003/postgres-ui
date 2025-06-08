'use client';

import { Tabs } from "@/components/Tabs";
import { useTabsStore } from "@/store/tabs";


export const ToolsBar = () => {

  const { tabs, currentTabIndex, addSqlScriptTab, removeTab, setCurrentTabIndex } = useTabsStore();


  return <div className="mt-4">
    <Tabs
      activeTab={currentTabIndex || 0}
      data={tabs}
      onTabClick={setCurrentTabIndex}
      onTabClose={removeTab}
      onTabAdd={addSqlScriptTab}
    />
  </div>
}
