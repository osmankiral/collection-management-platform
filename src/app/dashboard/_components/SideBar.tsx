import {

  House,
  PanelTopOpen,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
const SideBar = () => {
  return (
    <div className="flex-1 bg-white border-[1px] border-gray-400 rounded-lg p-4">
      <nav className="space-y-4">
        <p className="text-xs font-medium text-gray-400">MENÜ</p>
        <div className="ml-3 space-y-2">
          <Link
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black cursor-pointer"
            href="/dashboard"
          >
            <House size={20} />
            Dashboard
          </Link>

          <Link
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black cursor-pointer "
            href="#"
          >
            <PanelTopOpen size={22} />
            <div className="flex justify-between w-full">
              <span className="my-auto">Ürünler</span> <ChevronDown />
            </div>
          </Link>
        </div>
        <p className="text-xs font-medium text-gray-400">Satış</p>
        <Link href="/dashboard/collections">
          <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-black cursor-pointer ml-3">
            <ShoppingCart size={19} />
            Koleksiyon
          </div>
        </Link>
      </nav>
    </div>
  );
};
export default SideBar;
