import { IAccounts } from "@/types/account"
import { BsSend } from "react-icons/bs";


type Props = {
  data: IAccounts;
}
export const AccountTable: React.FC<Props> = ({ data }) => {
  return <table className="table table-zebra">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Policies</th>
        <th>Role</th>
        <th>Send key</th>
      </tr>
    </thead>
    <tbody>
      {data.map((account, index) => (
        <tr key={index}>
          <td>
            {account.name}
          </td>
          <td>
            {account.email}
          </td>
          <td>
            {account.policy?.split(" ").map((p, index) => (
              <span key={index} className="p-2 bg-black text-white rounded-lg mr-1">{p}</span>
            ))}
          </td>
          <td>
            {account.role?.split(" ").map((r, index) => (
              <span key={index} className="p-2 bg-black text-white rounded-lg mr-1">{r}</span>
            ))}
          </td>
          <td>
            <button className="btn">
              {<BsSend />}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
}
