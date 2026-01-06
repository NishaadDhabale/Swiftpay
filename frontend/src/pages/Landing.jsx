
    import React from 'react';
import { motion } from 'framer-motion';
import { ChartColumnIncreasing, Phone, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Reusable Stat Badge Component
const StatBadge = ({ value, label, className, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', damping: 15, delay }}
    whileHover={{ scale: 1.05 }}
    className={`absolute flex flex-col items-center justify-center rounded-full shadow-2xl ${className}`}
  >
    <span className="text-4xl font-bold tracking-tighter">{value}</span>
    <p className="text-[10px] font-bold uppercase leading-tight text-center px-4">
      {label}
    </p>
  </motion.div>
);

export default function LandingPage ()  {
  const navigate = useNavigate();
  // Animation Variants for the text reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden selection:bg-[#ff7d61]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center  gap-20">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">✱</span>
            <span className="text-sm font-medium opacity-80">nishaad.d.official@gmail.com</span>
          </div>
          <div className="hidden lg:flex gap-8 text-sm font-medium text-gray-400">
            {[ {name:'Resume',
              link:'https://drive.google.com/file/d/1LjC1VABL1t5vYaExj0GOYzpSo-Kk1_9j/view?usp=sharing'
            }].map((item) => (
              <a key={item.name} href={item.link} rel="noopener noreferrer" target="_blank" className="hover:text-white transition-colors">{item.name}</a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
         
          <button onClick={()=>{
            navigate('/signin')
          }}className="w-28 h-10 bg-[#ff7d61] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e75c3d] ">
            Login
          </button>
          <button onClick={()=>{
            navigate('/signup')
          }} className="bg-[#262626] border border-white/10 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition">
            Get Started — It's Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-10 pt-16 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="z-10"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#ff7d61] rounded-full flex items-center justify-center">
              <ChartColumnIncreasing size={18} className="text-black fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none">The Future</span>
              <span className="text-xs text-gray-500  cursor-pointer">Ready to Transform Your Payments?</span>
            </div>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-[140px] leading-[0.85] font-serif mb-12 tracking-tighter">
            Swift Pay
          </motion.h1>

          <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold italic tracking-tight  ">Seamless</h3>
              <button onClick={()=>{
                window.open('https://stackoverflow.com/questions/34224787/payment-transactions-vs-database-transactions','_blank')
              }} className="text-sm font-medium underline flex items-center gap-1">Read Story <ArrowUpRight size={14} /></button>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
             Send money, pay bills, and manage your finances with the most secure and fastest payment platform. Experience seamless transactions at your fingertips.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden">
                <img src="https://i.redd.it/70kxbgclienf1.jpeg" className="scale-125" alt="Nishaad Dhabale" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Nishaad Dhabale</span>
                  <span className="text-gray-600">/</span>
                 
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Project Head</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={()=>{
                navigate('/signup')
              }} className="bg-[#ff7d61] text-black font-bold px-10 py-4 rounded-full hover:scale-105 transition shadow-lg shadow-[#ff7d61]/20">
                Apply Now 
              </button>
              <button className="bg-transparent text-white font-medium px-10 py-4 rounded-full border border-white/20 hover:bg-white/5 transition">
                Check Our Plan
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Visuals */}
        <div className="relative flex justify-center items-center h-[600px]">
          {/* Main Orange Pill */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-48 h-[480px] bg-[#ff7d61] rounded-full overflow-hidde flex justify-center relative"
          >
            <img 
              src="./2.png"
              className="absolute  mt-20 scale-150 pr-2 object-cover grayscale mix-blend-luminosit hover:grayscale-0 transition-all duration-700"
              alt="Professional"
            />
            {/* White Circle Overlay */}
            <StatBadge 
              value="4X" 
              label="Complete Transactions in Seconds" 
              className="bottom-0  -translate-x-1 w-11/12 h-40 bg-white text-black z-30" 
              delay={0.3}
            />
          </motion.div>

          {/* Yellow Percent Circle */}
          <motion.div className="opacity-0 md:opacity-100"
          initial={{y:-350,x:200,opacity:0}}
          animate={{y:-300,x:200,opacity:1}}
          transition={{delay:0.3}}
          >
          <StatBadge 
            value="24/7" 
            label="Availablity 
            Make payments anytime, anywhere. "
            
            className="top-12 -right-4 w-48 h-48 bg-[#ffb800] text-black z-20" 
            delay={0.1}
          />
          </motion.div>

          {/* Purple App UI Circle */}
          <div
          className="opacity-0 md:opacity-100">
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.33 }}
            className="absolute bottom-12 -right-10 w-56 h-56 bg-[#9e7aff] rounded-full p-4 flex flex-col justify-center items-center overflow-hidden border-8 border-[#141414] shadow-2xl z-40"
          >
            <img 
              src="./1.png"
              className=" w-full mb-3 scale-125 object-cover grayscale-0 hover:grayscale transition-all duration-700"
              alt="Professional"
              delay={0.5}
            />

          </motion.div>
          </div>
        </div>
      </main>

      {/* Footer Logos */}
      {/*      <footer className="max-w-7xl mx-auto px-10 py-16 border-t border-white/5 opacity-40">
        <div className="flex flex-wrap justify-between items-center gap-8 filter grayscale invert">
          <span className="text-2xl font-bold tracking-tighter uppercase">Rakuten</span>
          <span className="text-2xl font-black italic tracking-widest">NCR</span>
          <span className="text-xl font-bold tracking-tight">monday.com</span>
          <span className="text-2xl font-serif">Disney</span>
          <span className="text-2xl font-bold flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-sm rotate-45" /> Dropbox
          </span>
        </div>
      </footer>
*/}
    </div>
  );
};

