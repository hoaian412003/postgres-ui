import { getAccesableObject } from "@/actions/databases";
import { useDatabaseStore } from "@/store/database";
import { redirect } from "next/navigation";

const NavigatePage = async () => {


  const accesableObject = await getAccesableObject();
  const databases = Object.keys(accesableObject);

  if (databases.length === 0) {
    return <div>
      <h1>You don't have permission to access to Postgres</h1>
    </div>
  }

  redirect(`/databases/${databases[0]}`);
}

export default NavigatePage;
