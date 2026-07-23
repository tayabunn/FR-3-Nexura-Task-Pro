import React from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from './ui/accordion';
import { TaskCard } from './TaskCard';
import { 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  XCircle, 
  Layers
} from 'lucide-react';

/**
 * Accordion View Component with Shadcn Accordion, rounded-md styling, and Light/Dark mode support
 */
export function AccordionView({ tasks, onEdit, onDelete, onStatusChange, onOpenCreateModal }) {
  const statusConfigs = [
    {
      id: 'Completed',
      title: 'Completed Tasks',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />,
      badgeBg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      description: 'Tasks that have been successfully finished',
    },
    {
      id: 'In Progress',
      title: 'In Progress Tasks',
      icon: <Clock className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0 animate-pulse" />,
      badgeBg: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      description: 'Tasks currently actively being worked on',
    },
    {
      id: 'To Do',
      title: 'To Do Tasks',
      icon: <CircleDot className="w-5 h-5 text-slate-400 shrink-0" />,
      badgeBg: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
      description: 'Tasks queued for upcoming execution',
    },
    {
      id: 'Failed',
      title: 'Failed / Blocked Tasks',
      icon: <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0" />,
      badgeBg: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30',
      description: 'Tasks that encountered errors or require troubleshooting',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Info Banner */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-md p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Status Breakdown Accordion View</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Expand status sections below to inspect and manage tasks by execution state.</p>
          </div>
        </div>
      </div>

      {/* Shadcn UI Accordion Component */}
      <Accordion type="multiple" defaultValue={['In Progress', 'To Do', 'Completed', 'Failed']}>
        {statusConfigs.map((statusItem) => {
          const matchingTasks = tasks.filter((t) => t.status === statusItem.id);
          const highPriorityCount = matchingTasks.filter(t => t.priority === 'High').length;

          return (
            <AccordionItem key={statusItem.id} value={statusItem.id} className="rounded-md border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60">
              
              {/* Accordion Header Trigger */}
              <AccordionTrigger value={statusItem.id} className="rounded-md">
                <div className="flex items-center space-x-3">
                  {statusItem.icon}
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{statusItem.title}</span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-bold font-mono border ${statusItem.badgeBg}`}>
                        {matchingTasks.length}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">{statusItem.description}</span>
                  </div>
                </div>

                {/* Priority Pills */}
                {matchingTasks.length > 0 && (
                  <div className="mr-3 hidden md:flex items-center space-x-2 text-[11px]">
                    {highPriorityCount > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold">
                        {highPriorityCount} High Priority
                      </span>
                    )}
                  </div>
                )}
              </AccordionTrigger>

              {/* Accordion Content Grid */}
              <AccordionContent value={statusItem.id} className="rounded-md border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40">
                {matchingTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {matchingTasks.map((task) => (
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
                  <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-950/20">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">No tasks currently marked as "{statusItem.id}".</p>
                  </div>
                )}
              </AccordionContent>

            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
