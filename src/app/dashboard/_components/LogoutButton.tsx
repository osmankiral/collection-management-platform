import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="cursor-pointer relative group"
    >
      <LogOut size={18} />
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        Çıkış Yap
      </span>
    </button>
  );
}

export default LogoutButton;
