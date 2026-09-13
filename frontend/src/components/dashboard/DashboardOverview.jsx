import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QuickStats } from './QuickStats';
import { TotalBalanceChart } from './TotalBalanceChart';
import { IncomeBarChart } from './IncomeBarChart';
import { RecentActivities } from './RecentActivities';

const LAYOUT_STORAGE_KEY = 'swiftpay-dashboard-layout';

const DEFAULT_ITEMS = [
  { id: '1', name: 'TotalBalanceChart', className: 'lg:col-span-8' },
  { id: '2', name: 'QuickStats', className: 'lg:col-span-4' },
  { id: '3', name: 'RecentActivities', className: 'lg:col-span-8' },
  { id: '4', name: 'IncomeBarChart', className: 'lg:col-span-4' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const ComponentFactory = ({ name }) => {
  const components = {
    TotalBalanceChart: <TotalBalanceChart />,
    QuickStats: <QuickStats />,
    IncomeBarChart: <IncomeBarChart />,
    RecentActivities: <RecentActivities isFullPage={false} limit={8} />,
  };
  return components[name] || null;
};

function SortableItem({ id, item, isEditing }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    touchAction: 'none',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      variants={itemVariants}
      layout
      {...(isEditing ? { ...attributes, ...listeners } : {})}
      className={`${item.className} ${isEditing ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
    >
      <motion.div
        whileHover={isEditing ? { scale: 1.01 } : {}}
        whileTap={isEditing ? { scale: 0.99 } : {}}
        className={`h-full relative transition-all duration-500 ${
          isEditing
            ? 'ring-2 ring-orange-500/40 rounded-[2rem] shadow-xl p-1 bg-orange-50/10'
            : ''
        }`}
      >
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 bg-orange-500 text-white p-1.5 rounded-full shadow-md z-20"
            />
          )}
        </AnimatePresence>
        <ComponentFactory name={item.name} />
      </motion.div>
    </motion.div>
  );
}

export const DashboardOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(DEFAULT_ITEMS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* use defaults */
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        const next = arrayMove(prev, oldIndex, newIndex);
        localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    }
  };

  const handleSaveLayout = () => {
    if (isEditing) {
      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(items));
    }
    setIsEditing(!isEditing);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-1 m-1 max-w-7xl mx-auto min-h-screen bg-[#F7F7F9] dark:bg-[#0D0D0F]"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Customize your workspace by dragging cards.
          </p>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveLayout}
          className={`px-6 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all ${
            isEditing
              ? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
              : 'bg-white dark:bg-[#1A1A1E] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-800'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Layout'}
        </motion.button>
      </div>

      <DndContext
        sensors={isEditing ? sensors : []}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} item={item} isEditing={isEditing} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </motion.div>
  );
};
