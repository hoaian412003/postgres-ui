import { ReactFlowProvider } from "@xyflow/react";
import { Header } from "../components/header";
import { getAccesableObject } from "@/actions/databases";
import { Left } from "../components/left";
import { ToolsBar } from "../components/toolsbar";

type Props = {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}

const Layout: React.FC<Props> = async ({ children, params }) => {

  const data = await getAccesableObject();
  const databases = Object.keys(data);

  const { database } = await params;

  return <div className="flex flex-col min-h-screen p-4 pb-0">
    <Header currentDatabase={database} />
    <ToolsBar />
    <div className="flex flex-1 h-full mt-4">
      <Left tables={data[database] as any} currentDatabase={database} databases={databases} />
      <ReactFlowProvider>
        {children}
      </ReactFlowProvider>
    </div>
  </div>

}

export default Layout;
