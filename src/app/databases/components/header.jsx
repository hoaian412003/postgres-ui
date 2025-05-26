'use client';

import { CiViewColumn } from "react-icons/ci";


export const Header = ({
  databases = [],
}) => {
  return <div className="flex align-center">
    <CiViewColumn className="text-3xl text-primary mt-1" />
    <div className="breadcrumbs text-md ml-2 p-0">
      <ul>
        <li>Database Managements</li>
        <li>
          <select defaultValue={databases[0]} className="select select-ghost text-lg pl-0">
            {databases.map((db, index) => (
              <option key={index} value={db} className="text-lg">{db}</option>
            ))}
          </select>

        </li>
      </ul>
    </div>
  </div>
}
