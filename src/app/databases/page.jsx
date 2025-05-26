import { getAccesableObject, getRelationships } from "@/actions/databases";
import { View } from "./components/view";

const DatabasePage = async () => {


  const accesableObject = await getAccesableObject();
  const relations = await getRelationships();

  return <div id="database-page" className="flex min-h-screen p-4 flex-col">
    <View data={accesableObject} relations={relations} />
  </div>
}

export default DatabasePage;
