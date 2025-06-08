import { Handle, Position } from "@xyflow/react";
import { FaTable } from "react-icons/fa";
import {
  Hash,
  Type,
  Calendar,
  List,
  Code,
  KeyRound,
  FileJson,
  Layers,
  Cloud,
  Wifi,
  DollarSign,
  Binary,
  Search,
  Box,
} from "lucide-react";

export type Table = {
  title: string;
  columns: {
    name: string;
    type?: string; // Optional type for future use
  }[];
}

type Props = {
  data: Table
}



export const TableSchemaNode: React.FC<Props> = ({ data }) => {
  return <div className="bg-white rounded shadow">
    <div className="flex items-center gap-2 bg-gray-100 rounded p-2">
      <FaTable className="text-gray-500" />
      <p className="text-bold text-sm">{data.title}</p>
    </div>
    <div>
      {data.columns.map((col, index) => (
        <div key={index} className="text-gray-700 text-sm flex items-center gap-2 relative px-2 py-1 border-b border-gray-200 hover:bg-gray-50">
          <Handle
            type="target"
            position={Position.Left}
            id={`${data.title}.${col.name}.target`}
            className="w-2 h-2 bg-gray-300 rounded-full"
          />
          <p>
            {col.name}
          </p>
          <div className="flex w-full items-center gap-2 justify-end">
            <p className="text-gray-500 text-right text-xs">
              {col.type}
            </p>
            {getPostgresTypeIcon(col.type || "", 12)}
          </div>
          <Handle
            type="source"
            position={Position.Right}
            id={`${data.title}.${col.name}.source`}
            className="w-2 h-2 bg-gray-300 rounded-full"
          />
        </div>
      ))}
    </div>
  </div>
}

export function getPostgresTypeIcon(dataType: string, size = 16) {
  const type = dataType.toLowerCase();
  const commonProps = {
    size,
  };

  if (/int|serial/.test(type))
    return <Hash {...commonProps} color="#2563eb" />; // Blue
  if (/float|real|double|numeric|decimal/.test(type))
    return <Type {...commonProps} color="#0ea5e9" />; // Cyan
  if (/char|text|citext/.test(type))
    return <List {...commonProps} color="#10b981" />; // Green
  if (/bool/.test(type))
    return <KeyRound {...commonProps} color="#f97316" />; // Orange
  if (/uuid/.test(type))
    return <KeyRound {...commonProps} color="#8b5cf6" />; // Violet
  if (/date|time|interval/.test(type))
    return <Calendar {...commonProps} color="#eab308" />; // Yellow
  if (/json/.test(type))
    return <FileJson {...commonProps} color="#14b8a6" />; // Teal
  if (/^_/.test(type))
    return <Layers {...commonProps} color="#6b7280" />; // Gray
  if (/bytea/.test(type))
    return <Binary {...commonProps} color="#4b5563" />; // Dark Gray
  if (/enum/.test(type))
    return <List {...commonProps} color="#22c55e" />; // Lime
  if (/point|line|polygon|geometry|circle|box|path/.test(type))
    return <Cloud {...commonProps} color="#38bdf8" />; // Light Blue
  if (/inet|cidr|macaddr/.test(type))
    return <Wifi {...commonProps} color="#f472b6" />; // Pink
  if (/money/.test(type))
    return <DollarSign {...commonProps} color="#16a34a" />; // Emerald
  if (/bit/.test(type))
    return <Binary {...commonProps} color="#7c3aed" />; // Indigo
  if (/tsvector|tsquery/.test(type))
    return <Search {...commonProps} color="#3b82f6" />; // Blue
  if (/xml/.test(type))
    return <Code {...commonProps} color="#a855f7" />; // Purple

  return <Box {...commonProps} color="#9ca3af" />; // Default - Neutral Gray
}
