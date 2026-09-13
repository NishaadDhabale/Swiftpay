import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export const TotalBalanceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get(`${BACKEND_URL}/api/v1/account/analytics`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((res) => {
        const data = (res.data.daily || []).map((day) => {
          const dateObj = new Date(day.date);
          return {
            ...day,
            displayDate: dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            fullDate: dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          };
        });
        setChartData(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[380px] bg-white dark:bg-[#1A1A1E] rounded-3xl animate-pulse border border-gray-100 dark:border-gray-800 shadow-sm" />
    );
  }

  return (
    <div className="w-full h-[380px] bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Income vs Expenses
          </h3>
          <p className="text-xs text-gray-400">Statistics</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5722]" />
            <span className="text-xs text-gray-500">Received</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-gray-900 dark:bg-white" />
            <span className="text-xs text-gray-500">Sent</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B3D" />
              <stop offset="100%" stopColor="#FF4B1A" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(156, 163, 175, 0.08)"
          />
          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            minTickGap={30}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-[#1A1A1E] p-3 rounded-xl border border-gray-800 shadow-2xl">
                    <p className="text-[10px] text-gray-500 mb-1">
                      {d.fullDate}
                    </p>
                    <div className="flex flex-col gap-1">
                      {d.received != null && (
                        <p className="text-emerald-400 text-xs">
                          Received: ₹{d.received}
                        </p>
                      )}
                      {d.sent != null && (
                        <p className="text-rose-400 text-xs">Sent: ₹{d.sent}</p>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="received"
            stroke="url(#incomeGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: '#FF6B3D',
              strokeWidth: 0,
              filter: 'url(#glow)',
            }}
            filter="url(#glow)"
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="sent"
            className="stroke-gray-900 dark:stroke-white"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: 'currentColor', strokeWidth: 0 }}
            filter="url(#glow)"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
