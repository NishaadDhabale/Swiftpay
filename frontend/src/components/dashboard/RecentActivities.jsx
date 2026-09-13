import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Code,
} from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

export const RecentActivities = ({ limit, isFullPage = false }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const [userRes, txRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: { Authorization: 'Bearer ' + token },
          }),
          axios.get(
            `${BACKEND_URL}/api/v1/account/transactions?limit=${limit || 100}`,
            { headers: { Authorization: 'Bearer ' + token } },
          ),
        ]);
        const uid = userRes.data.user._id;
        setUserId(uid);
        const processed = (txRes.data.transactions || []).map((tx) => {
          const isSender = tx.sender._id === uid;
          return {
            ...tx,
            type: isSender ? 'expense' : 'income',
            displayUser: isSender ? tx.receiver : tx.sender,
          };
        });
        setTransactions(processed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  const filteredData = transactions.filter((item) => {
    const nameMatch =
      item.displayUser?.firstName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.displayUser?.lastName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const typeMatch = typeFilter === 'All' || item.type === typeFilter;
    return nameMatch && typeMatch;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Amount', 'Type', 'Date', 'Status'];
    const rows = filteredData.map((tx) => [
      tx._id,
      `${tx.displayUser?.firstName} ${tx.displayUser?.lastName}`,
      tx.amount,
      tx.type,
      new Date(tx.createdAt).toLocaleDateString(),
      tx.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.json';
    a.click();
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 animate-pulse h-64 shadow-sm" />
    );
  }

  return (
    <div
      className={`bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-full shadow-sm ${isFullPage ? 'min-h-[600px]' : ''}`}
    >
      {/* Export Buttons */}
      {isFullPage && (
        <div className="inline-flex shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-4">
          <motion.button
            whileHover={{ scale: 1.02, zIndex: 30 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportCSV}
            style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}
            className="relative z-20 px-6 py-2 bg-white dark:bg-[#1A1A1E] text-gray-700 dark:text-gray-300 text-xs font-bold hover:text-emerald-600 border border-gray-200 dark:border-gray-800 rounded-l-2xl pr-10 transition-colors"
          >
            <div className="flex items-center gap-2">Export CSV</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, zIndex: 20 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportJSON}
            style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
            className="relative z-10 -ml-8 px-8 py-2 bg-white dark:bg-[#1A1A1E] text-gray-700 dark:text-gray-300 text-xs font-bold hover:text-blue-600 border border-gray-200 dark:border-gray-800 rounded-r-2xl pl-12 transition-colors border-l-0"
          >
            <div className="flex items-center gap-2">
              <Code size={14} />
              Export JSON
            </div>
          </motion.button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {isFullPage ? 'All Transactions' : 'Recent Activities'}
        </h3>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full md:w-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="income">Received</option>
            <option value="expense">Sent</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
            <tr>
              <th className="p-4 rounded-l-xl">Status</th>
              <th className="p-4">Person</th>
              <th className="p-4">Amount</th>
              {isFullPage && <th className="p-4">Date</th>}
              <th className="p-4 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <motion.tr
                    layout
                    key={item._id + idx}
                    variants={rowVariants}
                    exit={{ opacity: 0, x: 20 }}
                    className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            item.type === 'income'
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
                              : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
                          }`}
                        >
                          {item.type === 'income' ? (
                            <ArrowDownRight size={16} />
                          ) : (
                            <ArrowUpRight size={16} />
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${
                            item.type === 'income'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-500 dark:text-rose-400'
                          }`}
                        >
                          {item.type === 'income' ? 'Received' : 'Sent'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-gray-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.displayUser?.firstName?.[0]?.toUpperCase() ||
                            '?'}
                        </div>
                        {item.displayUser?.firstName}{' '}
                        {item.displayUser?.lastName}
                      </div>
                    </td>
                    <td
                      className={`p-4 font-bold ${
                        item.type === 'income'
                          ? 'text-emerald-500'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {item.type === 'income' ? '+' : '-'}
                      {formatCurrency(item.amount)}
                    </td>
                    {isFullPage && (
                      <td className="p-4 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    )}
                    <td className="p-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td
                    colSpan={isFullPage ? 5 : 4}
                    className="p-20 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Filter size={40} className="opacity-20" />
                      <p>No transactions found matching your filters.</p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setTypeFilter('All');
                        }}
                        className="text-orange-500 text-sm font-semibold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};