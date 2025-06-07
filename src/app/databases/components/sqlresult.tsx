import { PolicyInsufficientError } from '@/types/error';
import { DatabaseError } from 'pg';
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { getPostgresTypeIcon } from '@/components/TableSchemaNode';



type Props = {
  result?: Array<any>;
  error?: Error | DatabaseError | PolicyInsufficientError;
  loading: boolean
};

export const SqlResult: React.FC<Props> = ({ result, error, loading }) => {

  const renderError = () => {
    if (!error) return;
    if (error.name === PolicyInsufficientError.name) {
      const { message, needPolicies } = JSON.parse(error.message);
      return <div className="flex flex-col items-center gap-2">
        <MdNoEncryptionGmailerrorred size={30} />
        <p className='font-bold'>You don't have permission to execute this query</p>
        <div className="flex max-w-200 justify-center flex-wrap gap-2">{needPolicies.map((policy: string, index: number) =>
          <div
            className="flex bg-black text-white p-1 rounded-lg items-center gap-2" key={index}>
            <FiLock /> {policy}
          </div>)}
        </div>
      </div>
    } else {
      return <div className="flex flex-col items-center gap-2">
        <MdOutlineErrorOutline size={30} className="text-error" />
        <p className='font-bold'>Error when execute query</p>
        <p className='italic text-error'>{error.message}</p>
      </div>
    }
  }

  const renderResult = () => {
    if (!result) return;

    let { columns, rows } = result as any;
    if (rows.length > 0) rows = rows.slice(0, 100);
    return <table
      className="table table-pin-rows table-zebra"
    >
      <thead>
        <tr>
          {columns.map((col: any, index: number) => (
            <th key={index}>
              <div className="flex items-center gap-2">
                {getPostgresTypeIcon(col.dataType)}
                {col.name}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row: any, index: number) => (
          <tr key={index}>
            {columns.map((col: any, index: number) => (
              <td key={index}>{typeof row[col.name] === 'string' ? row[col.name] : row[col.name]?.toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  }


  return <div id="sql-result" className="bg-gray-50 flex flex-col max-h-full h-full">
    {
      loading ? <progress className="progress w-full"></progress> : null
    }
    {error &&
      <div className="flex h-full w-full items-center justify-center">
        {renderError()}
      </div>
    }
    {
      <div className="flex-1 max-h-full overflow-scroll">
        {renderResult()}
      </div>
    }
  </div>
}
