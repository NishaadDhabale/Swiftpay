export const CATEGORY_COLORS = {
  'Personal Transfer': '#F97316',
  'Business Payment': '#EF4444',
  'Family & Friends': '#6B7280',
  'Bills & Utilities': '#EAB308',
  'Shopping': '#A855F7',
  'Other': '#FF6B3D',
};

const FALLBACK_COLORS = ['#F97316', '#EF4444', '#6B7280', '#EAB308', '#A855F7', '#FF6B3D'];

export const inferCategory = (tx) => {
  const amount = tx.amount || 0;
  const name = `${tx.displayUser?.firstName ?? ''} ${tx.displayUser?.lastName ?? ''}`.trim();

  if (amount >= 10000) return 'Business Payment';
  if (amount >= 5000) return 'Bills & Utilities';
  if (amount >= 1000) return 'Shopping';
  if (name) return `To ${name}`;
  return 'Other';
};

export const getCategorySpending = (transactions) => {
  const rawData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, tx) => {
      const category = inferCategory(tx);
      acc[category] = (acc[category] || 0) + (tx.amount || 0);
      return acc;
    }, {});

  return Object.entries(rawData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value], index) => ({
      name,
      value,
      fill: CATEGORY_COLORS[name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
    }));
};
