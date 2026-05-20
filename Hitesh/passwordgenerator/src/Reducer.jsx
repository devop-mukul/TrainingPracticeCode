import { useReducer, useRef } from 'react';

const initialState = {
  entries: [],
  filter: 'all',
  form: {
    title: '',
    amount: '',
    type: 'expense',
  },
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };

    case 'ADD_ENTRY': {
      const title = state.form.title.trim();
      const amount = Number(state.form.amount);

      if (!title || Number.isNaN(amount) || amount <= 0) {
        return state;
      }

      const newEntry = {
        id: Date.now(),
        title,
        amount,
        type: state.form.type,
      };

      return {
        ...state,
        entries: [newEntry, ...state.entries],
        form: {
          title: '',
          amount: '',
          type: state.form.type,
        },
      };
    }

    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== action.id),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  }
} 

function ExpenseTracker() {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // useRef #1: direct DOM access (input focus)
  const titleInputRef = useRef(null);

  // useRef #2: mutable value that does NOT trigger re-render
  const actionCountRef = useRef(0);

  const filteredEntries = state.entries.filter((entry) => {
    if (state.filter === 'all') return true;
    return entry.type === state.filter;
  });

  const totals = state.entries.reduce(
    (acc, entry) => {
      if (entry.type === 'income') acc.income += entry.amount;
      else acc.expense += entry.amount;
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  function incrementActionCounter() {
    actionCountRef.current += 1;
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: 'ADD_ENTRY' });
    incrementActionCounter();
    titleInputRef.current?.focus();
  }

  return (
    <div style={{padding:2, margin:50, border:5, borderColor:'black', borderStyle:'solid', borderRadius:10}}>
      <h2>Expense Tracker (Minimal)</h2>

      <p>
        Income: ${totals.income.toFixed(2)} | Expense: ${totals.expense.toFixed(2)} | Balance: ${totals.balance.toFixed(2)}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Enter title"
          value={state.form.title}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FORM',
              field: 'title',
              value: e.target.value,
            })
          }
        />

        <input
          type="number"
          min="0"
          step="1"
          placeholder="Enter amount"
          value={state.form.amount}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FORM',
              field: 'amount',
              value: e.target.value,
            })
          }
        />

        <select
          value={state.form.type}
          onChange={(e) =>
            dispatch({
              type: 'UPDATE_FORM',
              field: 'type',
              value: e.target.value,
            })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button variant="contained" color="default" type="submit">
          Add Entry
        </button>
      </form>

      <div className="flex gap-3 mt-2">
        {['all', 'income', 'expense'].map((filter) => (
          <button
            className='hover:bg-gray-200 rounded'
            key={filter}
            onClick={() => {
              dispatch({ type: 'SET_FILTER', filter });
              incrementActionCounter();
            }}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      <p>Current Filter: {state.filter}</p>
      <p>Total UI Actions (useRef): {actionCountRef.current}</p>

      {filteredEntries.length === 0 ? (
        <p>No entries for this filter.</p>
      ) : (
        <ul>
          {filteredEntries.map((entry) => (
            <li key={entry.id}>
              {entry.title} | {entry.type} | {entry.type === 'expense' ? '-' : '+'}${entry.amount.toFixed(2)}{' '}
              <button
                onClick={() => {
                  dispatch({ type: 'DELETE_ENTRY', id: entry.id });
                  incrementActionCounter();
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseTracker;
