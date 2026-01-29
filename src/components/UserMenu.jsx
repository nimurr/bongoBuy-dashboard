import { Avatar, DarkThemeToggle, Dropdown, Flowbite } from "flowbite-react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdNotificationsNone } from "react-icons/md";


export default function UserMenu() {

  const { logOut, user } = useContext(AuthContext);
  // console.log("user :",user?.email)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("persist:auth");
    // logOut();
    navigate("/login");
  }

  const [openNotify, setOpenNotify] = useState(false);
  const notifyRef = useRef(null);


  /* ---------- CLOSE ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setOpenNotify(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- DEMO DATA ---------- */
  const notifications = [
    {
      id: 1,
      title: "New Subscription",
      message: "Tasmia Hassan subscribed to Standard plan",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "৳900 payment completed successfully",
      time: "10 min ago",
    },
    {
      id: 3,
      title: "Account Blocked",
      message: "Naim Rahman has been blocked",
      time: "1 hour ago",
    },
    {
      id: 4,
      title: "Account Blocked",
      message: "Naim Rahman has been blocked",
      time: "1 hour ago",
    },
    {
      id: 5,
      title: "Account Blocked",
      message: "Naim Rahman has been blocked",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="flex dark:text-white text-gray-600 justify-between items-center py-5 pl-3 lg:pl-0 pr-2">
      {/*=================== left side fake email ===========*/}
      <p className=" flex items-center">
        <h2 className="font-bold sm:text-xl text-xl">Dashboard</h2>
      </p>

      {/*======================== right side user information ==========================*/}
      <div className="flex items-center sm:gap-4 gap-2">
        <Flowbite className="dark:text-white tex-xl text-gray-600">
          {/* i want to set default value for icons */}
          {/* <DarkThemeToggle defaultChecked></DarkThemeToggle> */}
        </Flowbite>
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setOpenNotify(!openNotify)}
            className="relative p-2 rounded-full bg-primary text-[#fff] "
          >
            <MdNotificationsNone className="size-8" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* ----------- DROPDOWN ----------- */}
          {openNotify && (
            <div className="absolute -right-10 sm:right-0 mt-3 w-[320px] bg-[#1a3c58] rounded-xl shadow-xl z-50 border border-gray-500">
              <div className="px-4 py-3 border-b border-gray-500">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>

              <div className="max-h-[300px] scroll_Hide_item overflow-y-auto p-2 space-y-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#0f2435] p-2 rounded-md hover:bg-[#132f44] cursor-pointer"
                  >
                    <h4 className="text-sm text-primary">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {item.time}
                    </span>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">
                    No notifications
                  </p>
                )}
              </div>

              <div className="px-4 py-2 border-t border-gray-500">
                <button
                  onClick={() => setOpenNotify(false)}
                  className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        <Dropdown
          className="w-40"
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={user?.photoURL ? user?.photoURL : "https://img.icons8.com/?size=80&id=108652&format=png"}
              rounded
              className="z-10 border-2 border-primary px-5"
            />
          }
        >
          <Dropdown.Item className="flex text-gray-800 hover:text-white hover:bg-green-500 dark:text-white items-center gap-3 py-3">
            <Link className="flex items-center gap-2" to="/profile">
              <CiUser className="text-xl" />Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className="flex items-center gap-3 hover:text-white hover:bg-green-500 py-3" onClick={handleLogout}>
            <FaArrowRightFromBracket className="text-xl" /> Log Out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
