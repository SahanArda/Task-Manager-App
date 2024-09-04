import Sidebar from "../SideBar/SideBar";

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 fixed h-full bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 overflow-y-auto">
        <main className="max-w-5xl mx-auto py-4 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
