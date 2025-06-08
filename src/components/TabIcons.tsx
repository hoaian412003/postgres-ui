import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsFiletypeSql } from "react-icons/bs";
import { CiViewTable } from "react-icons/ci";

export const TabIcons = {
  Overview: MdOutlineSpaceDashboard,
  SQL: BsFiletypeSql,
  Table: CiViewTable
}

export type TabIconType = keyof typeof TabIcons;
