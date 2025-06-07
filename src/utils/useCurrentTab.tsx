'use client';

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsFiletypeSql } from "react-icons/bs";
import { CiViewTable } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const useCurrentTab = () => {

  const [_tabs, setTabs] = useState<Array<any>>([]);
  const [currentHash, setCurrentHash] = useState<string>("");
  const router = useRouter();

  const tabs = useMemo(() => {
    return [
      {
        title: "Overview",
        Icon: <MdOutlineSpaceDashboard size={20} />,
        deletable: false
      },
      ..._tabs
    ]
  }, [_tabs])

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    setCurrentHash(hash);
  }, []);

  useEffect(() => {
    const allTabs = JSON.parse(localStorage.getItem("tabs") || "[]")
    if (_tabs.length === 0) {
      setTabs(allTabs.map((tab: any) => ({
        ...tab,
        Icon: tab.title.includes("SQL") ? <BsFiletypeSql size={20} /> : <CiViewTable />,
      })))
    }
  }, []);

  const currentTab: number = useMemo(() => {
    if (!currentHash) {
      return 0;
    }
    const result = tabs.findIndex((tab) => {
      return tab.title.toLowerCase() === currentHash.toLowerCase();
    });
    if (result === -1) {
      return 0; // Default to the first tab if not found
    } return result;
  }, [tabs, currentHash]);

  const setCurrentTab = (tabIndex: number) => {
    setCurrentHash(`${tabs[tabIndex].title}`);
    router.push(`#${tabs[tabIndex].title}`);
  }


  // Add new sql script
  const onTabAdd = () => {
    const id = +(localStorage.getItem("tabId") || 0) + 1;
    const newTab = {
      title: "SQL Query " + id,
      Icon: <BsFiletypeSql size={20} />,
      deletable: true,
      content: "",
    };
    localStorage.setItem("tabId", id.toString());
    const allTabs = JSON.parse(localStorage.getItem("tabs") || "[]");
    const { Icon: _, ...saveTab } = newTab;
    allTabs.push(saveTab);
    localStorage.setItem("tabs", JSON.stringify(allTabs));
    setTabs([..._tabs, newTab]);
  }

  const onTabClose = (tabIndex: number) => {
    const allTabs = JSON.parse(localStorage.getItem("tabs") || "[]");
    allTabs.splice(tabIndex - 1, 1); // -1 because first tab is Overview
    localStorage.setItem("tabs", JSON.stringify(allTabs));
    setTabs(allTabs);
  }

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    setCurrentHash(hash);
  }, []);

  return { currentTab, setCurrentTab, onTabAdd, onTabClose, tabs }
}
