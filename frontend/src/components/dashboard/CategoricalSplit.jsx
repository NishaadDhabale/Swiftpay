import { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';
import { getCategorySpending } from '../../utils/analytics';
import { formatCurrency } from '../../utils/currency';
import { useCurrencyStore } from '../../hooks/useCurrencyStore';
import { BACKEND_URL } from '../../config';

function CustomTooltip({ active, payload, currency }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-[#1A1A1E] p-4 rounded-xl shadow-2xl border border-gray-800 min-w-[150px] relative z-50">
      <p className="text-sm font-semibold text-gray-400 mb-1">{data.name}</p>
      <p className="text-lg font-bold" style={{ color: data.fill }}>
        {formatCurrency(data.value, currency)}
      </p>
    </div>
  );
}

export const CategoricalSplit = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const { currency } = useCurrencyStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const [userRes, txRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: { Authorization: 'Bearer ' + token },
          }),
          axios.get(`${BACKEND_URL}/api/v1/account/transactions?limit=200`, {
            headers: { Authorization: 'Bearer ' + token },
          }),
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
  }, []);

  const data = useMemo(() => getCategorySpending(transactions), [transactions]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full animate-pulse min-h-[380px]" />
    );
  }

  return (
    <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Categorical Split</h3>
        <p className="text-xs text-gray-500">Outgoing payments by category</p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-gray-500 text-sm min-h-[280px]">
          No outgoing payment data available
        </div>
      ) : (
        <>
          <div className="relative flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                      className="transition-opacity duration-200 outline-none cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip currency={currency} />} cursor={false} />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Total Sent</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(total, currency)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-6">
            {data.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center gap-2 transition-opacity duration-200 cursor-pointer"
                style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.4 }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: entry.fill }} />
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate w-full" title={entry.name}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
