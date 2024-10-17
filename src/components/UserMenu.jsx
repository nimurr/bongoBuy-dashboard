import { Avatar, DarkThemeToggle, Dropdown, Flowbite } from "flowbite-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


export default function UserMenu() {

  const { logOut ,  user } = useContext(AuthContext);
  console.log("user :",user?.email)

  const handleLogout = ()=>{
    logOut();
  }

  return (
    <div className="flex justify-between items-center py-5 pl-3 lg:pl-0 pr-2">
      {/*=================== left side fake email ===========*/}
      <p className="dark:text-white flex items-center">
        <h2 className="font-bold sm:text-xl text-xl">Dashboard</h2>
      </p>

      {/*======================== right side user information ==========================*/}
      <div className="flex items-center sm:gap-4 gap-2">
        <Flowbite className="text-white border ">
          <DarkThemeToggle></DarkThemeToggle>
        </Flowbite>

        <Dropdown
          className=""
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={user?.photoURL ? user?.photoURL  : "https://img.icons8.com/?size=80&id=108652&format=png"}
              rounded
              className="z-10 mb-4"
            />
          }
        > 
          <Dropdown.Item className="flex items-center gap-3" onClick={handleLogout}>
            <FaArrowRightFromBracket className="text-xl" /> Log Out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
