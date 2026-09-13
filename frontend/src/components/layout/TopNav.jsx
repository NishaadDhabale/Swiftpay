import { useState } from 'react';
import { ChevronDown, Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../hooks/useThemeStore';
import { CurrencyToggle } from '../common/CurrencyToggle';

export const TopNav = ({ userInitials, userName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Send Money', path: '/send' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between bg-transparent relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sliding Pill Navigation */}
      <div className="hidden md:flex flex-row space-x-1 bg-white dark:bg-[#1A1A1E] p-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <button
                className={`relative px-5 py-2 rounded-full text-sm font-medium outline-none transition-colors duration-300 ${
                  isActive
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="pill-bg"
                    className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </Link>

          );
        })}

      </div>
      <CurrencyToggle/>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme toggle on mobile */}

        <button
          onClick={toggleTheme}
          className="md:hidden p-2.5 rounded-full bg-white dark:bg-[#1A1A1E] border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white dark:bg-[#1A1A1E] p-1.5 pr-4 rounded-full shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all"
          >
            <div className="w-8 h-8 bg-[#FF5722] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-orange-500/30">
              {userInitials || 'U'}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold leading-none">
                {userName?.split(' ')[0] || 'User'}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} className="text-gray-400" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#1A1A1E] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-20"
                >
                  <div className="p-2">
                    <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-800 mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</p>
                      <p className="text-xs text-orange-500 font-bold uppercase tracking-wider mt-0.5">SwiftPay User</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 font-medium mt-1"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute top-20 left-4 right-4 bg-white dark:bg-[#1A1A1E] rounded-2xl shadow-2xl z-30 p-3 flex flex-col gap-1 md:hidden border border-gray-100 dark:border-gray-800"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl font-medium text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="w-full p-3 rounded-xl font-medium text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-left transition-colors flex items-center gap-2"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
