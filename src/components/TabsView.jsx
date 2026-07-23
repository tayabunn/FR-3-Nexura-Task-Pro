import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { 
  CircleDot, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Layers,
  Plus
} from 'lucide-react';

/**
 * Status Tabs View Component with dynamic light/dark mode status colors
 */
export function TabsView({ tasks, onEdit, onDelete, onStatusChange, onOpenCreateModal }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    {
      id: 'All',
      label: 'All Tasks',
      icon: <Layers className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />,
      badgeBg: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
      activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 border border-indigo-500',
      inactiveClass: 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
    },
    {
      id: 'To Do',
      label: 'To Do',
      icon: <CircleDot className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />,
      badgeBg: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      activeClass: 'bg-slate-700 text-white shadow-md border border-slate-600',
      inactiveClass: 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
    },
    {
      id: 'In Progress',
      label: 'In Progress',
      icon: <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-pulse shrink-0" />,
      badgeBg: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
      activeClass: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 border border-indigo-500',
      inactiveClass: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
    },
    {
      id: 'Completed',
      label: 'Completed',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />,
      badgeBg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
      activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 border border-emerald-500',
      inactiveClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
    },
    {
      id: 'Failed',
      label: 'Failed',
      icon: <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />,
      badgeBg: 'bg-rose-500/20 text-rose-700 dark:text-rose-300',
      activeClass: 'bg-rose-600 text-white shadow-md shadow-rose-500/30 border border-rose-500',
      inactiveClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 hover:bg-rose-100 dark:hover:bg-rose-900/60'
    },
  ];

  const activeTasks = activeTab === 'All' ? tasks : tasks.filter((t) => t.status === activeTab);

  return (
    <div className="space-y-6">
      {/* 5 Status Tabs Header Bar */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-md p-2 shadow-sm backdrop-blur-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {tabs.map((tab) => {
            const count = tab.id === 'All' ? tasks.length : tasks.filter((t) => t.status === tab.id).length;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-md text-xs font-bold transition-all duration-200 ${
                  isActive ? tab.activeClass : tab.inactiveClass
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold shrink-0 ml-1 ${
                  isActive ? 'bg-white/20 text-white' : tab.badgeBg
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Task Cards Grid */}
      {activeTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-md p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">
            No tasks currently found in "{activeTab}".
          </p>
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        </div>
      )}
    </div>
  );
}
