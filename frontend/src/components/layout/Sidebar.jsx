
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ArrowLeftRight, BarChart2, Send, LogOut, Sun, Moon,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../hooks/useThemeStore';

const NavItem = ({ icon, active = false, tooltip }) => (
  <div className="relative group">
    <div
      className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
        active
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md'
          : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
      }`}
    >
      {icon}
    </div>
    {/* Tooltip */}
    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 shadow-xl">
      {tooltip}
    </div>
  </div>
);

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
    { to: '/transactions', icon: <ArrowLeftRight size={22} />, label: 'Transactions' },
    { to: '/send', icon: <Send size={22} />, label: 'Send Money' },
  ];

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-20 hidden md:flex flex-col items-center py-6 bg-white dark:bg-[#1A1A1E] border-r border-gray-100 dark:border-gray-800 z-10 h-full flex-shrink-0"
    >
      {/* Logo */}
      <div className="w-10 h-10 bg-[#FF5722] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-8 shadow-lg shadow-orange-500/30 flex-shrink-0">
        S
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mb-8 transition-colors text-gray-500 dark:text-gray-400"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-5 flex-1">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            <NavItem
              icon={link.icon}
              active={location.pathname === link.to}
              tooltip={link.label}
            />
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button onClick={handleLogout}>
          <NavItem icon={<LogOut size={22} />} tooltip="Logout" />
        </button>
      </div>
    </motion.aside>
  );
};
