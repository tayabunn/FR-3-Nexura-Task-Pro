import React from 'react';
import { Calendar, Edit3, Trash2, Clock, CheckCircle2, CircleDot, XCircle, AlertCircle } from 'lucide-react';
import { CustomSelect } from './ui/select';

/**
 * Tabular List View Component for Tasks with forward z-index stacking and rounded-md styling
 */
export function ListView({ tasks, onEdit, onDelete, onStatusChange }) {
  const priorityBadges = {
    High: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  };

  const statusOptions = [
    { value: 'To Do', label: 'To Do', icon: <CircleDot className="w-3.5 h-3.5 text-slate-400" /> },
    { value: 'In Progress', label: 'In Progress', icon: <Clock className="w-3.5 h-3.5 text-cyan-400" /> },
    { value: 'Completed', label: 'Completed', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
    { value: 'Failed', label: 'Failed', icon: <XCircle className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-md p-12 text-center shadow-sm">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No tasks found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-md shadow-sm dark:shadow-2xl">
      <div className="overflow-visible rounded-md">
        <table className="w-full text-left border-collapse text-xs">
          
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4 rounded-tl-md">Task Details</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-4 text-right rounded-tr-md">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {tasks.map((task) => {
              const dateObj = task.due_date ? new Date(task.due_date) : null;
              const isOverdue = dateObj && dateObj < new Date() && task.status !== 'Completed';

              return (
                <tr 
                  key={task.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group relative z-10 hover:z-30 focus-within:z-40"
                >
                  {/* Title & Description & Image thumbnail */}
                  <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                    <div className="flex items-center space-x-3">
                      {task.image_url && (
                        <img 
                          src={task.image_url} 
                          alt="" 
                          className="w-10 h-10 object-cover rounded-md border border-slate-200 dark:border-slate-800 shrink-0" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors truncate">
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-slate-500 dark:text-slate-400 truncate text-[11px] mt-0.5">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Priority Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${priorityBadges[task.priority] || priorityBadges.Medium}`}>
                      {task.priority}
                    </span>
                  </td>

                  {/* Status Dropdown (CustomSelect with rounded-md options) */}
                  <td className="py-3.5 px-4 whitespace-nowrap relative z-30">
                    <CustomSelect
                      value={task.status}
                      onChange={(newVal) => onStatusChange(task.id, newVal)}
                      options={statusOptions}
                      size="sm"
                    />
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {dateObj ? (
                      <span className={`inline-flex items-center space-x-1 ${isOverdue ? 'text-rose-500 dark:text-rose-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                        {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />}
                        <span>{dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">--</span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Task"
                      >
                        <Edit3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
