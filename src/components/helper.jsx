// calculate total income, expense and balance
export const totalStat = ({ incomeData, expenseData }) => {
  const income = incomeData?.reduce((acc, item) => acc + item.amount, 0);
  const expense = expenseData?.reduce((acc, item) => acc + item.amount, 0);
  return {
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense,
  };
};

// date formatter
export const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
  const day = `${dateObj.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// display date formatter
export const formatDisplayDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  return `${day} ${month} ${year}`;
};
