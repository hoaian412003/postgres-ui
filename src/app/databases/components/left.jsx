import { Tree } from "./tree"

export const Left = ({
  tableColumns = [],
  databaseName
}) => {
  return <div>
    <Tree tableColumns={tableColumns} databaseName={databaseName} />
  </div>
}
