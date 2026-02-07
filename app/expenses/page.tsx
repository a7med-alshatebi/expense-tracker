'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types';

export default function ExpensesPage() {
  const router = useRouter();
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

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
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
        <button 
          onClick={() => router.push('/')}
          className="btn-back"
        >
          ← Back
        </button>
        <h1>💰 All Expenses</h1>
        <p>View and manage all your expenses</p>
      </header>

      <section className="card summary-card">
        <div className="summary-item">
          <div className="summary-icon">💵</div>
          <div className="summary-content">
            <span className="summary-label">Total Spent</span>
            <span className="summary-value">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <span className="summary-label">Transactions</span>
            <span className="summary-value">{filteredExpenses.length}</span>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <div className="summary-icon">📅</div>
          <div className="summary-content">
            <span className="summary-label">Date Range</span>
            <span className="summary-value">
              {startDate || endDate ? `${startDate || 'Any'} - ${endDate || 'Any'}` : 'All time'}
            </span>
          </div>
        </div>
      </section>

      <section className="card expenses-page-card">
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
  );
}
