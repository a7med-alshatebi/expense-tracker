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

const categoryColors: Record<string, { background: string; text: string }> = {
  Food: { background: '#fef3c7', text: '#92400e' },
  Transportation: { background: '#dbeafe', text: '#1e40af' },
  Entertainment: { background: '#ede9fe', text: '#5b21b6' },
  Shopping: { background: '#fee2e2', text: '#991b1b' },
  Bills: { background: '#e2e8f0', text: '#334155' },
  Health: { background: '#d1fae5', text: '#065f46' },
  Other: { background: '#f5f3ff', text: '#6d28d9' },
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
          <span
            className="category-badge"
            style={{
              backgroundColor: categoryColors[expense.category]?.background || '#e2e8f0',
              color: categoryColors[expense.category]?.text || '#334155',
            }}
          >
            {expense.category}
          </span>
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
