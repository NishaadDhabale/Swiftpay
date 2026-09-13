import { motion } from 'framer-motion';
import { useCurrencyStore } from '../../hooks/useCurrencyStore';
import { INR_TO_USD_RATE } from '../../utils/currency';

export const CurrencyToggle = () => {
  const { currency, toggleCurrency } = useCurrencyStore();
  const isInr = currency === 'INR';

  return (
    <button
      onClick={toggleCurrency}
      title={`Switch to ${isInr ? 'USD' : 'INR'} (1 USD = ₹${INR_TO_USD_RATE})`}
      className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white dark:bg-[#1A1A1E] border border-gray-100 dark:border-gray-800 text-xs font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <motion.span
        key={currency}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className={isInr ? 'text-orange-500' : 'text-emerald-500'}
      >
        {isInr ? '₹ INR' : '$ USD'}
      </motion.span>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <span className="text-gray-400 font-medium">{isInr ? '$ USD' : '₹ INR'}</span>
    </button>
  );
};
