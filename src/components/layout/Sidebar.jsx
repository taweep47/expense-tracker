import { NavLink } from "react-router-dom";
import { LayoutDashboard, BadgeDollarSign, BarChart3 } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200">
      <div className="p-6 text-xl font-semibold">Expense</div>

      <nav className="px-4 space-y-1">
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Overview"
        />

        <SidebarItem
          to="/transactions"
          icon={<BadgeDollarSign size={18} />}
          label="Transactions"
        />

        <SidebarItem
          to="/analytics"
          icon={<BarChart3 size={18} />}
          label="Analytics"
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3
      px-4 py-2 rounded-lg
      text-sm font-medium
      transition
      ${
        isActive
          ? "bg-slate-200 text-slate-900"
          : "text-slate-700 hover:bg-slate-100"
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
