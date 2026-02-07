'use client';

import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryBreakdown from './components/CategoryBreakdown';
import { Expense } from './types';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const filteredExpenses = expenses.filter((expense) => {
    if (startDate && expense.date < startDate) {
      return false;
    }
    if (endDate && expense.date > endDate) {
      return false;
    }
    return true;
  });

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
          <div className="date-filters">
            <div className="filter-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
            >
              Clear Filters
            </button>
          </div>
          <CategoryBreakdown expenses={filteredExpenses} />
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </section>
      </main>
    </div>
  );
}
