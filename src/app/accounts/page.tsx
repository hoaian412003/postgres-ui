import { AccountTable } from "./components/accounttable";
import { Header } from "./components/header";

const AccountPage = () => {
  return <div id="account-page" className="p-4">
    <h1 className="text-xl font-bold">Key Distribution</h1>
    <Header />
    <AccountTable data={
      [
        {
          name: "ROOT Admin",
          policy: "ROOT"
        },
        {
          name: "Developer",
          policy: "test::*::*"
        },
        {
          name: "Tester",
          policy: "test::users::* test::orders::* test::order_detail::*"
        },
        {
          name: "Hoai An",
          role: "Developer Tester",
          email: "hoaian412003@gmail.com"
        },
      ]
    } />
  </div>
}

export default AccountPage;
