import Sidebar from "../SideBar/SideBar";

function Layout({ children }) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <main className="max-w-5xl flex-1 mx-auto py-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
