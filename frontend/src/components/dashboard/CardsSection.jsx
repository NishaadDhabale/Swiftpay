import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export const CardsSection = () => {
  const [stats, setStats] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const [balRes, statRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/account/balance`, { headers: { Authorization: "Bearer " + token } }),
          axios.get(`${BACKEND_URL}/api/v1/account/analytics`, { headers: { Authorization: "Bearer " + token } })
        ]);

        setBalance(balRes.data.balance);
        setStats(statRes.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: <Wallet size={20} className="text-orange-500" />,
      bg: 'bg-orange-50 dark:bg-orange-500/10'
    },
    {
      title: 'Total Received',
      amount: stats?.totalReceived || 0,
      icon: <ArrowDownRight size={20} className="text-emerald-500" />,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10'
    },
    {
      title: 'Total Sent',
      amount: stats?.totalSent || 0,
      icon: <ArrowUpRight size={20} className="text-rose-500" />,
      bg: 'bg-rose-50 dark:bg-rose-500/10'
    },
    {
      title: 'Net Flow',
      amount: stats?.netFlow || 0,
      icon: <Activity size={20} className="text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          key={idx}
          className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${card.bg}`}>
              {card.icon}
            </div>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(card.amount)}
            </h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
