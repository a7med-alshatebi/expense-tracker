'use client';

import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses yet. Add your first expense above!</p>
      </div>
    );
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-list">
      <div className="expense-summary">
        <h3>Total Expenses</h3>
        <p className="total-amount">${totalAmount.toFixed(2)}</p>
      </div>

      <div className="expenses">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
}
