import Navbar from "../../components/Dashboard/Navbar";
import Searchbar from "../../components/Dashboard/Searchbar";
import Users from "../../components/Dashboard/Users";
import { cookies } from "next/headers";

const Dashboard = (req) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwtToken");
  console.log(token);
  return (
    <div>
      <Navbar />
      <Searchbar />
      <Users />
    </div>
  );
};

export default Dashboard;
