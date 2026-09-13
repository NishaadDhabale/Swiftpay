import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Lock, Database, Briefcase, TrendingUp, TrendingDown } from 'lucide-react';
import axios from 'axios';
import { formatCurrency } from '../../utils/currency';
import { useCurrencyStore } from '../../hooks/useCurrencyStore';
import { BACKEND_URL } from '../../config';

export const QuickStats = () => {
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState(0);
  const { currency } = useCurrencyStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    Promise.all([
      axios.get(`${BACKEND_URL}/api/v1/account/balance`, { headers: { Authorization: 'Bearer ' + token } }),
      axios.get(`${BACKEND_URL}/api/v1/account/analytics`, { headers: { Authorization: 'Bearer ' + token } }),
    ]).then(([balRes, statRes]) => {
      setBalance(balRes.data.balance);
      setData(statRes.data);
    }).catch(console.error);
  }, []);

  const stats = [
    {
      title: 'Total Balance',
      amount: formatCurrency(balance, currency),
      trend: '+12.5%',
      isPositive: true,
      highlight: true,
      icon: <Wallet size={18} />,
    },
    {
      title: 'Total Sent',
      amount: formatCurrency(data?.totalSent || 0, currency),
      trend: '-4.2%',
      isPositive: false,
      highlight: false,
      icon: <Lock size={18} />,
    },
    {
      title: 'Total Received',
      amount: formatCurrency(data?.totalReceived || 0, currency),
      trend: '+8.1%',
      isPositive: true,
      highlight: false,
      icon: <Database size={18} />,
    },
    {
      title: 'Net Flow',
      amount: formatCurrency(data?.netFlow || 0, currency),
      trend: data?.netFlow >= 0 ? '+' + Math.abs(((data?.netFlow || 0) / Math.max(data?.totalReceived || 1, 1)) * 100).toFixed(1) + '%' : '-5.3%',
      isPositive: (data?.netFlow || 0) >= 0,
      highlight: false,
      icon: <Briefcase size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className={`p-5 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
            stat.highlight
              ? 'bg-gradient-to-br from-[#FF6B3D] to-[#FF4B1A] text-white shadow-xl shadow-orange-500/20 border-none'
              : 'bg-white dark:bg-[#1A1A1E] text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500/30 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <span className={`text-sm font-medium ${stat.highlight ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {stat.title}
            </span>
            <div className={`p-2.5 rounded-2xl ${
              stat.highlight
                ? 'bg-white/20 text-white backdrop-blur-md'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-400'
            }`}>
              {stat.icon}
            </div>
          </div>

          <div>
            <h3 className="text-2xl xl:text-3xl font-bold tracking-tight mb-2">{stat.amount}</h3>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-[10px] ${
                stat.highlight
                  ? 'bg-white/20 text-white'
                  : stat.isPositive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
              }`}>
                {stat.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stat.trend.replace(/[+-]/, '')}
              </span>
              <span className={`text-[10px] font-medium ${stat.highlight ? 'text-orange-100/80' : 'text-gray-400'}`}>
                vs last month
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
