'use client';
import { CiViewColumn } from "react-icons/ci";

type Props = {
  currentDatabase?: string;
}

export const Header: React.FC<Props> = ({ currentDatabase }) => {

  return <div className="flex items-center">
    <CiViewColumn className="text-3xl text-primary" />
    <div className="breadcrumbs text-md ml-2 p-0">
      <ul>
        <li>Database Managements</li>
        <li>
          <p className="font-bold">
            {currentDatabase}
          </p>
        </li>
      </ul>
    </div>
  </div>
}
