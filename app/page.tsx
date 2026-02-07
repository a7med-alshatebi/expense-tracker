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

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="container">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your daily expenses and manage your budget</p>
      </header>

      <section className="card summary-card">
        <div className="summary-item">
          <span className="summary-label">Total (filtered)</span>
          <span className="summary-value">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-label">Transactions</span>
          <span className="summary-value">{filteredExpenses.length}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-label">Date Range</span>
          <span className="summary-value">
            {startDate || endDate ? `${startDate || 'Any'} - ${endDate || 'Any'}` : 'All time'}
          </span>
        </div>
      </section>

      <main className="main-content">
        <section className="card add-expense-section">
          <h2 className="card-title">Add New Expense</h2>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </section>

        <div className="right-column">
          <section className="card category-card">
            <h2 className="card-title">Categories</h2>
            <CategoryBreakdown expenses={filteredExpenses} />
          </section>

          <section className="card expenses-section">
            <h2 className="card-title">Your Expenses</h2>
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
            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
