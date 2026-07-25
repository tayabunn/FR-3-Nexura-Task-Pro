import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

/**
 * Filter & Real-Time Search Controls Bar with rounded-md styling & Light/Dark theme support
 */
export function TaskFilters({ 
  searchQuery, 
  setSearchQuery, 
  priorityFilter, 
  setPriorityFilter,
  totalCount,
  filteredCount
}) {
  const priorities = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-md p-4 mb-6 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
      
      {/* Real-time Search Input */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks by title or details..."
          className="w-full pl-10 pr-9 py-2 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-md text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Priority Pill Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mr-1 hidden lg:flex">
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-slate-400" />
          <span>Priority:</span>
        </div>
        {priorities.map((p) => (
          <button
            key={p}
            onClick={() => setPriorityFilter(p)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
              priorityFilter === p
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Task Counter badge */}
        <div className="ml-auto text-xs text-slate-500 dark:text-slate-400 font-mono pl-2 border-l border-slate-200 dark:border-slate-800">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredCount}</span> / {totalCount}
        </div>
      </div>

    </div>
  );
}
