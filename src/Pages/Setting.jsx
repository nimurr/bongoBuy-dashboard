import { Outlet } from "react-router-dom";
import SettingNav from "../components/SettingNav";

 
export default function Setting() {
  return (
    <div className="sm:flex gap-4">
        <div className="lg:w-2/12 mb-5 ms:mb-0">
           <SettingNav></SettingNav>
        </div>
        <div className="w-full">
          <Outlet></Outlet>
        </div>
    </div>
  )
}
