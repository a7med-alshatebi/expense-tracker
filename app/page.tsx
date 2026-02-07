'use client';

import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { Expense } from './types';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
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
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </section>
      </main>
    </div>
  );
}
