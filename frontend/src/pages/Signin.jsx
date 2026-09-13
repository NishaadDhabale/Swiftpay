import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { BACKEND_URL } from '../config';
import { GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ChartColumnIncreasing } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const handleSignin = async () => {
    if (!username || !password) { setError('Please fill in all fields'); return; }
    setLoading(true); setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, { username, password });
      const token = response.data.token;
      if (token) { localStorage.setItem('token', token); navigate('/dashboard'); }
      else { setError(response.data.message); }
    } catch (e) {
      setError(e.response?.data?.message || 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex overflow-hidden selection:bg-[#ff7d61]">
      {/* ── Left Branding Panel ── */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[55%] flex-col justify-between p-16 relative overflow-hidden"
      >
        {/* Background decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff7d61]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ff7d61]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-[#FF5722] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <ChartColumnIncreasing size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold">SwiftPay</span>
        </div>

        {/* Hero text */}
        <div className="z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="text-[80px] leading-[0.9] font-serif tracking-tighter mb-8 text-white"
          >
            Swift
            <br />
            <span className="text-[#ff7d61]">Pay</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg leading-relaxed max-w-sm"
          >
            Send money, pay bills, and manage your finances with the most secure and fastest payment platform.
          </motion.p>

          {/* Stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 mt-10"
          >
            {[{ val: '4X', label: 'Faster Transfers' }, { val: '24/7', label: 'Availability' }, { val: '100%', label: 'Secure' }].map((s) => (
              <div key={s.val} className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-2xl font-bold text-white">{s.val}</span>
                <span className="text-[9px] text-gray-400 text-center leading-tight mt-0.5 px-2">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom author */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden flex-shrink-0">
            <img src="https://i.redd.it/70kxbgclienf1.jpeg" className="w-full h-full object-cover scale-125" alt="Author" />
          </div>
          <div>
            <p className="font-bold text-sm">Nishaad Dhabale</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Project Head</p>
          </div>
        </div>
      </motion.div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-[#FF5722] rounded-lg flex items-center justify-center">
              <ChartColumnIncreasing size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold">SwiftPay</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-1">Welcome back</h2>
            <p className="text-gray-500 mb-8">Sign in to your SwiftPay account</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => { setUserName(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSignin()}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 outline-none focus:border-[#ff7d61]/60 focus:bg-white/8 focus:ring-2 focus:ring-[#ff7d61]/20 transition-all text-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSignin()}
                  className="w-full px-5 py-4 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 outline-none focus:border-[#ff7d61]/60 focus:bg-white/8 focus:ring-2 focus:ring-[#ff7d61]/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignin}
                disabled={loading}
                className="w-full py-4 bg-[#ff7d61] hover:bg-[#e85f43] disabled:opacity-60 text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff7d61]/20 text-sm"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <><span>Sign in</span><ArrowRight size={16} /></>
                )}
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="relative flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-600 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  setLoading(true);
                  try {
                    const res = await axios.post(`${BACKEND_URL}/api/v1/user/auth/google`, { token: credentialResponse.credential });
                    localStorage.setItem('token', res.data.token);
                    navigate('/dashboard');
                  } catch { setError('Google sign-in failed.'); }
                  finally { setLoading(false); }
                }}
                onError={() => setError('Google sign-in failed.')}
              />
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-center text-gray-500 text-sm mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#ff7d61] font-semibold hover:underline">Sign up</Link>
          </motion.p>

          <motion.div variants={itemVariants} className="text-center mt-4">
            <button onClick={() => navigate('/')} className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
              ← Back to homepage
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
