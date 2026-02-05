import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { User, LogOut } from "lucide-react";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <span className="text-sm text-slate-600">{user?.name}</span>

          <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-medium">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">
            
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="w-full  px-4 py-2 text-base hover:bg-slate-100 flex text-center"
            >
              <User className="size-5 mr-2  items-center"></User>
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-base px-4 py-2 flex text-center text-red-500 hover:bg-slate-100"
            >
              <LogOut className="size-5 mr-2  items-center"></LogOut>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
