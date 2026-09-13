import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useThemeStore } from '../../hooks/useThemeStore';

import axios from 'axios';
import { useState } from 'react';
import { BACKEND_URL } from '../../config';

export const DashboardLayout = () => {
  const { isDarkMode, syncTheme } = useThemeStore();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    syncTheme(isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/signin'); return; }
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        setUser(res.data.user);
      } catch {
        navigate('/signin');
      }
    };
    fetchUser();
  }, [navigate]);

  const userInitials = user
    ? (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
    : 'U';
  const userName = user ? `${user.firstName} ${user.lastName}` : 'User';

  return (
    <div className="flex w-full selection:bg-orange-200 selection:text-orange-500 h-screen overflow-hidden bg-[#F7F7F9] dark:bg-[#0D0D0F]">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNav userInitials={userInitials} userName={userName} />
        <div className="flex-1 overflow-y-auto p-3 mx-5 md:mx-0 pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
