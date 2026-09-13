import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ChartColumnIncreasing, Check } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const steps = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Account' },
];

export const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const handleNext = () => {
    if (!firstName || !lastName) { setError('Please enter your first and last name.'); return; }
    setError(null);
    setStep(2);
  };

  const handleSignup = async () => {
    if (!userName || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true); setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username: userName, firstName, lastName, password,
      });
      const token = response.data.token;
      if (token) { localStorage.setItem('token', token); navigate('/dashboard'); }
      else { setError(response.data.message); }
    } catch (e) {
      setError(e.response?.data?.message || 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex overflow-hidden selection:bg-[#ff7d61]">

      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[55%] flex-col justify-between p-16 relative overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#ff7d61]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ff7d61]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 bg-[#FF5722] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <ChartColumnIncreasing size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold">SwiftPay</span>
        </div>


        <div className="z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[80px] leading-[0.9] font-serif tracking-tighter mb-8"
          >
            Join<br /><span className="text-[#ff7d61]">Swift</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg leading-relaxed max-w-sm mb-10"
          >
            Create your account in seconds and start sending money at lightning speed.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            {[
              'Instant peer-to-peer transfers',
              'Real-time analytics dashboard',
              'Bank-grade security & encryption',
              'Zero hidden fees',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ff7d61]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-[#ff7d61]" />
                </div>
                <span className="text-gray-300 text-sm">{feat}</span>
              </div>
            ))}
          </motion.div>
        </div>


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


      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-[#FF5722] rounded-lg flex items-center justify-center">
              <ChartColumnIncreasing size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold">SwiftPay</span>
          </motion.div>

          {/* Step indicator */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            {steps.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  step === s.id
                    ? 'bg-[#ff7d61] text-black'
                    : step > s.id
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-gray-600'
                }`}>
                  {step > s.id ? <Check size={12} /> : <span>{s.id}</span>}
                  <span>{s.label}</span>
                </div>
                {idx < steps.length - 1 && <div className={`h-px w-8 ${step > s.id ? 'bg-[#ff7d61]/50' : 'bg-white/10'}`} />}
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-1">
              {step === 1 ? 'Create your account' : 'Set up your login'}
            </h2>
            <p className="text-gray-500 mb-8">
              {step === 1 ? 'Enter your personal details to get started' : 'Choose your email and a strong password'}
            </p>
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

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setError(null); }}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 outline-none focus:border-[#ff7d61]/60 focus:ring-2 focus:ring-[#ff7d61]/20 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setError(null); }}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 outline-none focus:border-[#ff7d61]/60 focus:ring-2 focus:ring-[#ff7d61]/20 transition-all text-sm"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full py-4 bg-[#ff7d61] hover:bg-[#e85f43] text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff7d61]/20 text-sm"
                >
                  Continue <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value); setError(null); }}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 outline-none focus:border-[#ff7d61]/60 focus:ring-2 focus:ring-[#ff7d61]/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(null); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                      className="w-full px-5 py-4 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 outline-none focus:border-[#ff7d61]/60 focus:ring-2 focus:ring-[#ff7d61]/20 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { setStep(1); setError(null); }}
                    className="px-6 py-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl font-semibold text-sm transition-all border border-white/10"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSignup}
                    disabled={loading}
                    className="flex-1 py-4 bg-[#ff7d61] hover:bg-[#e85f43] disabled:opacity-60 text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff7d61]/20 text-sm"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <><span>Create Account</span><ArrowRight size={16} /></>
                    )}
                  </motion.button>
                </div>

                <div className="relative flex items-center gap-4 py-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-600 text-xs font-medium">or sign up with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      setLoading(true);
                      try {
                        const res = await axios.post(`${BACKEND_URL}/api/v1/user/auth/google`, { token: credentialResponse.credential });
                        localStorage.setItem('token', res.data.token);
                        navigate('/dashboard');
                      } catch { setError('Google sign-up failed.'); }
                      finally { setLoading(false); }
                    }}
                    onError={() => setError('Google sign-up failed.')}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p variants={itemVariants} className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#ff7d61] font-semibold hover:underline">Sign in</Link>
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