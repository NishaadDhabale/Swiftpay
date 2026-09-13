import { motion } from 'framer-motion';
import { RecentActivities } from '../components/dashboard/RecentActivities';
import { CategoricalSplit } from '../components/dashboard/CategoricalSplit';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const Transactions = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-1 m-1 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h2>
        <p className="text-gray-500 dark:text-gray-400">Your complete payment history</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <RecentActivities isFullPage={true} />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <CategoricalSplit />
        </motion.div>
      </div>
    </motion.div>
  );
};
