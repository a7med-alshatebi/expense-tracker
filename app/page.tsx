'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExpenseForm from './components/ExpenseForm';
import CategoryBreakdown from './components/CategoryBreakdown';
import { Expense } from './types';

export default function Home() {
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
      <header className="header fade-in-up">
        <h1>💰 Expense Tracker</h1>
        <p>Track your daily expenses and manage your budget</p>
      </header>

      <section className="card summary-card fade-in-up fade-in-up-delay-1">
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
        <button
          onClick={() => router.push('/expenses')}
          className="btn-view-all"
        >
          View All →
        </button>
      </section>

      <main className="main-content">
        <section className="card add-expense-section fade-in-up fade-in-up-delay-2">
          <h2 className="card-title">Add New Expense</h2>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </section>

        <div className="right-column">
          <section className="card category-card fade-in-up fade-in-up-delay-3">
            <h2 className="card-title">Categories</h2>
            <CategoryBreakdown expenses={filteredExpenses} />
          </section>
        </div>
      </main>
    </div>
  );
}
