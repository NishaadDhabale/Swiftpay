export const CATEGORY_COLORS = {
    'General': '#94A3B8',
    'Personal Transfer': '#F97316',
    'Business Payment': '#EF4444',
    'Family & Friends': '#6B7280',
    'Bills & Utilities': '#EAB308',
    'Shopping': '#A855F7',
    'Food': '#10B981',
    'Transport': '#3B82F6',
    'Entertainment': '#EC4899',
    'Health': '#14B8A6',
    'Other': '#FF6B3D',
};

const FALLBACK_COLORS = [
  '#F97316',
  '#EF4444',
  '#6B7280',
  '#EAB308',
  '#A855F7',
  '#FF6B3D',
];

export const inferCategory = (tx) => {
  const amount = tx.amount || 0;

  const name = `${tx.displayUser?.firstName ?? ''} ${
    tx.displayUser?.lastName ?? ''
  }`.trim();

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

      // Use manually saved category first.
      // Infer only when category doesn't exist.
      const category = tx.category || inferCategory(tx);

      acc[category] =
        (acc[category] || 0) + (tx.amount || 0);

      return acc;
    }, {});

  return Object.entries(rawData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value], index) => ({
      name,
      value,
      fill:
        CATEGORY_COLORS[name] ||
        FALLBACK_COLORS[index % FALLBACK_COLORS.length],
    }));
};