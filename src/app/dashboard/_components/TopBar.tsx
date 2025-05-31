import { Bell, Globe, Mail, SlidersVertical } from "lucide-react";
import LogoutButton from "./LogoutButton";

const TopBar = () => {
  console.log("NEXTAUTH_SECRET: ", process.env.NEXTAUTH_SECRET);
  return (
    <div className="h-16 bg-white border border-gray-400 rounded-lg flex items-center justify-between pl-5 pr-10">
      <div className="flex w-full justify-between">
        <div className="space-y-1">
          <h2 className="text-md font-bold">Koleksiyon</h2>
          <h4 className="text-sm">Koleksiyon Listesi</h4>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="w-px h-10 bg-gray-300"></div>
          <div className="flex space-x-4 ">
            <Globe size={19} />
            <div className="relative inline-block">
              <Bell size={20} />
              <span
                className="absolute -top-2 -right-2 flex items-center justify-center
                       h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] font-semibold
                       ring-2 ring-white"
              >
                12
              </span>
            </div>
            <Mail size={20}/>
            <SlidersVertical size={20}/>
           <LogoutButton/>
          </div>
           <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
