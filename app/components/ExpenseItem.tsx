'use client';

import { Expense } from '../types';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const categoryEmojis: Record<string, string> = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '📄',
  Health: '🏥',
  Other: '📌',
};

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="expense-item">
      <div className="expense-icon">
        {categoryEmojis[expense.category] || '📌'}
      </div>
      <div className="expense-details">
        <h4>{expense.description}</h4>
        <p className="expense-meta">
          <span className="category">{expense.category}</span>
          <span className="date">{formatDate(expense.date)}</span>
        </p>
      </div>
      <div className="expense-actions">
        <span className="amount">${expense.amount.toFixed(2)}</span>
        <button
          onClick={() => onDelete(expense.id)}
          className="btn-delete"
          aria-label="Delete expense"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
