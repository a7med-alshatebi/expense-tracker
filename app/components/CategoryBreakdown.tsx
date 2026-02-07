'use client';

import { Expense, ExpenseCategory } from '../types';

interface CategoryBreakdownProps {
  expenses: Expense[];
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Other',
];

const categoryColors: Record<ExpenseCategory, string> = {
  Food: '#ff6b6b',
  Transportation: '#4dabf7',
  Entertainment: '#a78bfa',
  Shopping: '#f783ac',
  Bills: '#64748b',
  Health: '#51cf66',
  Other: '#ffd43b',
};

const categoryEmojis: Record<ExpenseCategory, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎮',
  Shopping: '🛍️',
  Bills: '📄',
  Health: '💊',
  Other: '📌',
};

export default function CategoryBreakdown({ expenses }: CategoryBreakdownProps) {
  if (expenses.length === 0) {
    return null;
  }

  const totals = categories.map((category) => {
    const amount = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return { category, amount };
  });

  const totalAmount = totals.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="category-breakdown">
      {totalAmount > 0 && (
        <div className="category-chart" aria-label="Spending by category chart">
          {totals
            .filter(({ amount }) => amount > 0)
            .map(({ category, amount }) => {
              const percent = (amount / totalAmount) * 100;

              return (
                <div
                  key={category}
                  className="category-chart-segment"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: categoryColors[category],
                  }}
                  title={`${category}: ${percent.toFixed(1)}%`}
                  aria-label={`${category} ${percent.toFixed(1)}%`}
                />
              );
            })}
        </div>
      )}
      <div className="breakdown-list">
        {totals.map(({ category, amount }) => {
          const percent = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;

          return (
            <div key={category} className="breakdown-item">
              <div className="breakdown-header">
                <div className="category-info">
                  <span className="category-emoji">{categoryEmojis[category]}</span>
                  <span className="breakdown-label">{category}</span>
                </div>
                <div className="category-stats">
                  <span className="breakdown-amount">${amount.toFixed(2)}</span>
                  <span className="breakdown-percent">{percent.toFixed(1)}%</span>
                </div>
              </div>
              <div className="breakdown-bar">
                <div
                  className="breakdown-bar-fill"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: categoryColors[category],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
