import type { NextPage } from "next";
import AdminPage from "../src/components/Pages/admin";
import { AuthProvider } from "../src/context/context";

const Page: NextPage = () => {
  //
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
};

export default Page;
