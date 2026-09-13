import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, User as UserIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BACKEND_URL } from '../config';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const SendMoney = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');

  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!id) {
      const token = localStorage.getItem('token');
      axios
        .get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => setUsers(res.data.user))
        .catch(console.error);
    }
  }, [filter, id]);

  const handleTransfer = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) { setErrorMsg('Please enter a valid amount'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/account/transfer`,
        { to: id, amount: numAmount },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      );
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Transaction failed. Please try again.');
    }
  };

  const handleSelectUser = (user) => {
    setSearchParams({ id: user._id, name: `${user.firstName} ${user.lastName}` });
    setStatus('idle'); setAmount(''); setErrorMsg('');
  };

  const handleBack = () => {
    setSearchParams({}); setStatus('idle'); setAmount(''); setErrorMsg('');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-1 m-1 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h2>
        <p className="text-gray-500 dark:text-gray-400">Send money securely to anyone</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm min-h-[500px] flex flex-col"
      >
        <AnimatePresence mode="wait">
          {!id ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="max-w-2xl mx-auto w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select Recipient</h3>
              <div className="relative mb-8">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full pl-11 pr-10 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white text-sm transition-all"
                />
                {filter && (
                  <button onClick={() => setFilter('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                    <X size={16} />
                  </button>
                )}
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
                {users.map((u) => (
                  <motion.div
                    key={u._id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    onClick={() => handleSelectUser(u)}
                    className="flex items-center justify-between p-4 rounded-2xl cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {u.firstName[0].toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{u.firstName} {u.lastName}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{u.username}</p>
                      </div>
                    </div>
                    <div className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                      <ArrowRight size={20} />
                    </div>
                  </motion.div>
                ))}
                {users.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <UserIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p>{filter ? `No users found matching "${filter}"` : 'Type a name to search for users'}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : status === 'success' ? (

            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="max-w-md mx-auto text-center py-10 flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Sent!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                You successfully sent <span className="font-bold text-gray-900 dark:text-white">₹{amount}</span> to <span className="font-bold text-gray-900 dark:text-white">{name}</span>.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/transactions')}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-sm transition-all"
                >
                  View Transactions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="px-6 py-3 bg-[#FF5722] hover:bg-[#e04e1e] text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-orange-500/30"
                >
                  Send More
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="max-w-md mx-auto w-full"
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to search
              </button>

              {/* Recipient Card */}
              <div className="flex items-center gap-4 mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  {name ? name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Sending to</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-300 dark:text-gray-600">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value); setErrorMsg(''); setStatus('idle'); }}
                    className="w-full text-3xl font-bold text-center py-6 pl-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 mb-6">
                {[500, 1000, 2000, 5000].map((v) => (
                  <button
                    key={v}
                    onClick={() => { setAmount(String(v)); setErrorMsg(''); setStatus('idle'); }}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-500/10 dark:hover:text-orange-400 transition-colors"
                  >
                    ₹{v >= 1000 ? v / 1000 + 'k' : v}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="text-rose-500 text-sm text-center font-medium bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl mb-4 border border-rose-100 dark:border-rose-500/20"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTransfer}
                disabled={status === 'loading'}
                className="w-full py-4 bg-[#FF5722] hover:bg-[#e04e1e] disabled:opacity-60 text-white rounded-2xl font-bold text-base transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : 'Confirm Payment'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
