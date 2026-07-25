import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { CircleDot, Clock, CheckCircle2, XCircle, Plus } from 'lucide-react';

/**
 * Kanban Board Layout Component with HTML5 Drag & Drop, rounded-md styling, and Light/Dark mode support
 */
export function KanbanBoard({ tasks, onEdit, onDelete, onStatusChange, onOpenCreateModal }) {
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    {
      id: 'To Do',
      title: 'To Do',
      icon: <CircleDot className="w-4 h-4 text-slate-400 shrink-0" />,
      headerBorder: 'border-slate-300 dark:border-slate-700',
      badgeBg: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      icon: <Clock className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />,
      headerBorder: 'border-cyan-500/50',
      badgeBg: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30',
    },
    {
      id: 'Completed',
      title: 'Completed',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />,
      headerBorder: 'border-emerald-500/50',
      badgeBg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30',
    },
    {
      id: 'Failed',
      title: 'Failed',
      icon: <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />,
      headerBorder: 'border-rose-500/50',
      badgeBg: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30',
    },
  ];

  // Drag & Drop Handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== colId) {
      setDragOverColumn(colId);
    }
  };

  const handleDragLeave = (e, colId) => {
    e.preventDefault();
    if (dragOverColumn === colId) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    setDragOverColumn(null);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onStatusChange(taskId, colId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        const isDraggingOver = dragOverColumn === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={(e) => handleDragLeave(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex flex-col rounded-md bg-slate-100/80 dark:bg-slate-900/40 border p-4 min-h-[500px] transition-all ${
              isDraggingOver
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/30'
                : 'border-slate-200 dark:border-slate-800/80'
            }`}
          >
            {/* Column Header */}
            <div className={`flex items-center justify-between pb-3 mb-4 border-b ${col.headerBorder}`}>
              <div className="flex items-center space-x-2.5">
                {col.icon}
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">{col.title}</h2>
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold font-mono ${col.badgeBg}`}>
                  {colTasks.length}
                </span>
              </div>

              {col.id === 'To Do' && (
                <button
                  onClick={onOpenCreateModal}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Add task to To Do"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Task List / Drop Zone */}
            <div className="flex-1 space-y-3">
              {colTasks.length > 0 ? (
                colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="cursor-grab active:cursor-grabbing rounded-md"
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                    />
                  </div>
                ))
              ) : (
                <div className="h-40 border-2 border-dashed border-slate-300 dark:border-slate-800/60 rounded-md flex flex-col items-center justify-center text-center p-4">
                  <p className="text-xs text-slate-500 font-medium mb-1">No tasks in {col.title}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-600">Drag tasks here or create a new task</p>
                </div>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
