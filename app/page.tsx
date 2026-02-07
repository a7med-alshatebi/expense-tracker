'use client';

import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import { Expense } from './types';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your daily expenses and manage your budget</p>
      </header>

      <main className="main-content">
        <section className="add-expense-section">
          <h2>Add New Expense</h2>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </section>

        <section className="expenses-section">
          <h2>Your Expenses</h2>
          <div className="empty-state">
            <p>No expenses yet. Add your first expense!</p>
          </div>
        </section>
      </main>
    </div>
  );
}
