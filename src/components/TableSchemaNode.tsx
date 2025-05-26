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

  if (/int|serial/.test(type)) return <Hash size={size} />;
  if (/float|real|double|numeric|decimal/.test(type)) return <Type size={size} />;
  if (/char|text|citext/.test(type)) return <List size={size} />;
  if (/bool/.test(type)) return <KeyRound size={size} />;
  if (/uuid/.test(type)) return <KeyRound size={size} />;
  if (/date|time|interval/.test(type)) return <Calendar size={size} />;
  if (/json/.test(type)) return <FileJson size={size} />;
  if (/^_/.test(type)) return <Layers size={size} />;
  if (/bytea/.test(type)) return <Binary size={size} />;
  if (/enum/.test(type)) return <List size={size} />;
  if (/point|line|polygon|geometry|circle|box|path/.test(type)) return <Cloud size={size} />;
  if (/inet|cidr|macaddr/.test(type)) return <Wifi size={size} />;
  if (/money/.test(type)) return <DollarSign size={size} />;
  if (/bit/.test(type)) return <Binary size={size} />;
  if (/tsvector|tsquery/.test(type)) return <Search size={size} />;
  if (/xml/.test(type)) return <Code size={size} />;

  return <Box size={size} />; // Default fallback
}
