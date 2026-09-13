import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export const CashFlowChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BACKEND_URL}/api/v1/account/analytics`, {
          headers: { Authorization: "Bearer " + token }
        });

        const data = res.data.daily.map(day => {
            const dateObj = new Date(day.date);
            return {
                ...day,
                displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                fullDate: dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        });

        setChartData(data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="w-full h-[380px] bg-white dark:bg-[#1A1A1E] rounded-3xl animate-pulse shadow-sm border border-gray-100 dark:border-gray-800"></div>;

  return (
    <div className="w-full h-[380px] bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cash Flow</h3>
          <p className="text-xs text-gray-400">Received vs Sent</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-gray-500">Received</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-xs text-gray-500">Sent</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />

          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            minTickGap={30}
          />

          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-[#1A1A1E] p-3 rounded-xl border border-gray-800 shadow-2xl">
                    <p className="text-[10px] text-gray-500 mb-2">{data.fullDate}</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-emerald-400 text-xs">Received: ₹{data.received}</p>
                      <p className="text-rose-400 text-xs">Sent: ₹{data.sent}</p>
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
            activeDot={{ r: 6, fill: '#10B981', strokeWidth: 0 }}
            connectNulls={true}
          />

          <Line
            type="monotone"
            dataKey="sent"
            stroke="url(#expenseGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#F43F5E', strokeWidth: 0 }}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
