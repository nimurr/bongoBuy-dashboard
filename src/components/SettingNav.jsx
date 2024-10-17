import {  NavLink } from "react-router-dom";

export default function SettingNav() {
  return (
    <div className="bg-white dark:bg-[#1f2937] dark:text-white rounded">
      <NavLink to='/setting' className="px-10 py-3 block hover:bg-slate-300 hover:text-gray-800 border-b border-gray-400">Header</NavLink>
      <NavLink to='/social-link' className="px-10 py-3 block hover:bg-slate-300 hover:text-gray-800 border-b border-gray-400">Social Link</NavLink>
      <NavLink to='/contact' className="px-14 py-3 block hover:bg-slate-300 hover:text-gray-800 ">Contact</NavLink>
    </div>
  );
}
