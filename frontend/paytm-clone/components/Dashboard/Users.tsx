import Link from "next/link";
import { User } from "./Navbar";

interface Prop {
  user: User;
  index: number;
}

const Users = ({ user, index }: Prop) => {
  return (
    <div className="px-7">
      <ul>
        <li className="flex justify-between space-y-3 " key={index}>
          <div className="flex">
            {user && <span> U{index}</span>}
            <h3 className="px-2 font-medium">
              {user?.firstName ? user.firstName.toUpperCase() : ""}
            </h3>
          </div>
          <div>
            {user && (
              <Link href={`/send?id=${user._id}`}>
                <button className="rounded-md bg-black px-2 py-1 text-white">
                  Send money
                </button>
              </Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Users;
