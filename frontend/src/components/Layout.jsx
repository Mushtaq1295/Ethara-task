import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, LogOut } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">
            TM
          </div>
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/projects" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <FolderKanban size={20} />
            Projects
          </Link>
        </nav>

        <div className="border-t border-gray-200 pt-4 pb-2">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
