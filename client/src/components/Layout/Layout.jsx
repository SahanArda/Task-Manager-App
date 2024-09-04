import Sidebar from "../SideBar/SideBar";

function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar - Fixed and Non-scrollable */}
      <div className="fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main content area - Scrollable */}
      <div className="flex-1 md:ml-64 overflow-y-auto h-screen">
        <main className="max-w-5xl mx-auto py-4 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
