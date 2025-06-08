'use client'

import { ReactNode } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TabIcons, TabIconType } from "./TabIcons";

export type ITab = {
  title: string;
  Icon: TabIconType;
  deletable: boolean;
  content?: string;
}

type Props = {
  data: ITab[];
  activeTab: number;
  onTabClick: (index: number) => void;
  onTabClose: (index: number) => void;
  onTabAdd: () => void;
}

export const Tabs: React.FC<Props> = ({
  data,
  activeTab,
  onTabClick,
  onTabClose,
  onTabAdd
}) => {
  return <div className="tabs tabs-lift" role="tablist">
    {data.map((tab, index) => {
      const Icon = TabIcons[tab.Icon];
      return (
        <div
          key={index}
          className={`tab gap-1 font-bold ${activeTab === index ? 'tab-active' : ''}`}
          role="tab"
          onClick={() => onTabClick(index)}
        >
          {<Icon />}
          {tab.title}
          {
            tab.deletable
            &&
            <IoCloseCircleOutline size={16} onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onTabClose(index);
            }} />
          }
        </div>
      )
    })}
    <div className="tab tab-add" role="tab" onClick={onTabAdd}>
      <IoMdAddCircleOutline size={16} />
      <span className="ml-1">SQL script</span>
    </div>
  </div>
}
