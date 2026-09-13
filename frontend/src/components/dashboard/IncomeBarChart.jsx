import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const IncomeBarChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    Promise.all([
      axios.get(`${BACKEND_URL}/api/v1/user/me`, { headers: { Authorization: 'Bearer ' + token } }),
      axios.get(`${BACKEND_URL}/api/v1/account/transactions?limit=200`, { headers: { Authorization: 'Bearer ' + token } }),
    ]).then(([userRes, txRes]) => {
      setUserId(userRes.data.user._id);
      setTransactions(txRes.data.transactions || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const chartData = useMemo(() => {
    const monthly = Array(12).fill(null).map((_, i) => ({ month: MONTHS[i], rawIncome: 0, rawExpense: 0 }));
    transactions.forEach((tx) => {
      const m = new Date(tx.createdAt).getMonth();
      if (tx.receiver?._id === userId || tx.receiver === userId) monthly[m].rawIncome += tx.amount;
      else monthly[m].rawExpense += tx.amount;
    });
    const maxVal = Math.max(...monthly.map((d) => Math.max(d.rawIncome, d.rawExpense)), 1);
    return monthly.map((d) => ({
      ...d,
      profitPercent: (d.rawIncome / maxVal) * 100,
      lossPercent: (d.rawExpense / maxVal) * 100,
    }));
  }, [transactions, userId]);

  const maxVal = Math.max(...chartData.map((d) => Math.max(d.rawIncome, d.rawExpense)), 1);
  const yAxisLabels = [maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0].map((v) =>
    v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v.toFixed(0)}`
  );

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full animate-pulse min-h-[300px]" />
    );
  }

  return (
    <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Income vs Expenses</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">View your cash flow over the year</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm mb-4">
        <span className="font-semibold text-gray-900 dark:text-white">Profit and Loss</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#FF5722]" />
            <span className="text-gray-500 text-xs">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-gray-900 dark:bg-white" />
            <span className="text-gray-500 text-xs">Expense</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 relative mt-4 flex items-end justify-between pl-8 border-b border-gray-100 dark:border-gray-800/50 pb-2 min-h-[200px]">
        {/* Y Axis */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-medium text-gray-400 pb-2">
          {yAxisLabels.map((label, i) => <span key={i}>{label}</span>)}
        </div>

        {/* Grid lines */}
        <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="border-b border-dashed border-gray-200 dark:border-gray-800/60 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="flex justify-between w-full relative z-10 h-full items-end pt-2">
          {chartData.map((data, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 group w-7 relative"
              title={`Income: ${formatCurrency(data.rawIncome)}\nExpense: ${formatCurrency(data.rawExpense)}`}
            >
              <div className="w-full flex flex-col justify-end gap-[1px] h-48">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.profitPercent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05, type: 'spring', bounce: 0.2 }}
                  className={`w-full relative overflow-hidden bg-[#FF5722] ${data.lossPercent === 0 ? 'rounded-b-md' : ''} ${data.profitPercent > 0 ? 'rounded-t-md' : ''}`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#000_4px,#000_8px)]" />
                </motion.div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.lossPercent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 + 0.1, type: 'spring', bounce: 0.2 }}
                  className={`w-full bg-gray-900 dark:bg-white ${data.profitPercent === 0 ? 'rounded-t-md' : ''} ${data.lossPercent > 0 ? 'rounded-b-md' : ''}`}
                />
              </div>
              <span className="text-[10px] font-medium text-gray-400 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
