
const escapeCSV = (value) => {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};


export const convertTransactionsToCSV = (transactions) => {
  const headers = ['ID', 'Name', 'Amount (INR)', 'Type', 'Date', 'Status'];
  const rows = transactions.map((tx) => [
    tx._id,
    `${tx.displayUser?.firstName ?? ''} ${tx.displayUser?.lastName ?? ''}`.trim(),
    tx.amount,
    tx.type === 'income' ? 'Received' : 'Sent',
    new Date(tx.createdAt).toLocaleDateString('en-US'),
    tx.status,
  ]);

  return [headers, ...rows].map((row) => row.map(escapeCSV).join(',')).join('\n');
};


export const triggerDownload = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};



export const exportTransactions = (transactions, format) => {
  if (format === 'csv') {
    triggerDownload(convertTransactionsToCSV(transactions), 'transactions.csv', 'text/csv;charset=utf-8;');
  } else {
    const sanitized = transactions.map(({ displayUser, type, amount, status, createdAt, _id }) => ({
      id: _id,
      name: `${displayUser?.firstName ?? ''} ${displayUser?.lastName ?? ''}`.trim(),
      amount,
      type: type === 'income' ? 'Received' : 'Sent',
      date: new Date(createdAt).toISOString(),
      status,
    }));
    triggerDownload(JSON.stringify(sanitized, null, 2), 'transactions.json', 'application/json');
  }
};
