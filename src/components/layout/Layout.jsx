import { Outlet  } from "react-router-dom";
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

const Layout  = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 p-6">
          <Outlet  />
        </main>
      </div>
    </div>
  )
}

export default Layout
