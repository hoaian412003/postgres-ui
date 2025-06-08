import { getAccesableObject, getRelationships } from "@/actions/databases";
import { Tabs } from "../components/tabs";

type Props = {
  params: Promise<Record<string, string>>;
}

const DatabasePage: React.FC<Props> = async ({ params }) => {

  const data = await getAccesableObject();

  const { database } = await params;
  const relations = await getRelationships();

  return (
    <div className="position-relative w-full max-h-screen flex-col flex">
      <Tabs data={data[database]} relations={relations[database]} database={database} />
    </div>
  );
}

export default DatabasePage;
