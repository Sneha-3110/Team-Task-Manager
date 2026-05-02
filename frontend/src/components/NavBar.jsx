import { Link, useNavigate } from 'react-router-dom';
import { ClipboardCheck, LayoutDashboard, LogIn, LogOut, ShieldPlus } from 'lucide-react';

export default function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 px-5 py-4 text-slate-900 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 font-black tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-cyan-300 shadow-sm">
            <ClipboardCheck size={22} />
          </span>
          <span className="text-xl">TeamManager</span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <LayoutDashboard size={17} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              {user.role === 'Admin' && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-teal-700 transition hover:bg-teal-50"
                >
                  <ShieldPlus size={17} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                <LogOut size={17} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
