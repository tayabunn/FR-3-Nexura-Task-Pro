import React, { useState } from 'react';
import { 
  Calendar, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  CircleDot,
  XCircle,
  Bookmark,
  Activity,
  Tag
} from 'lucide-react';
import { CustomSelect } from './ui/select';

// Default aesthetic cover photos for cards
const DEFAULT_COVERS = [
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=80'
];

/**
 * TaskCard Component with high-contrast status button for Light and Dark modes
 */
export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Cover image selection
  const coverImage = task.image_url || DEFAULT_COVERS[Math.abs(parseInt(task.id || '0', 10) % DEFAULT_COVERS.length)];

  const priorityBadgeStyles = {
    High: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40',
    Medium: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40',
    Low: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40',
  };

  const statusProgress = {
    'To Do': { pct: 15, color: 'bg-slate-400', label: 'Queued' },
    'In Progress': { pct: 65, color: 'bg-indigo-500 animate-pulse', label: 'In Progress' },
    'Completed': { pct: 100, color: 'bg-emerald-500', label: '100% Done' },
    'Failed': { pct: 30, color: 'bg-rose-500', label: 'Action Needed' },
  };

  const statusButtonStyles = {
    'To Do': 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700',
    'In Progress': 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:text-white dark:border-indigo-500 dark:hover:bg-indigo-500 shadow-md shadow-indigo-500/20',
    'Completed': 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:text-white dark:border-emerald-500 dark:hover:bg-emerald-500 shadow-md shadow-emerald-500/20',
    'Failed': 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:text-white dark:border-rose-500 dark:hover:bg-rose-500 shadow-md shadow-rose-500/20',
  };

  const currentProgress = statusProgress[task.status] || statusProgress['To Do'];

  const statusIcons = {
    'To Do': <CircleDot className="w-3.5 h-3.5 text-slate-300 shrink-0" />,
    'In Progress': <Clock className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />,
    'Completed': <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />,
    'Failed': <XCircle className="w-3.5 h-3.5 text-white shrink-0" />,
  };

  const statusOptions = [
    { value: 'To Do', label: 'To Do', icon: <CircleDot className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> },
    { value: 'In Progress', label: 'In Progress', icon: <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> },
    { value: 'Completed', label: 'Completed', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> },
    { value: 'Failed', label: 'Failed', icon: <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const isOverdue = date < now && task.status !== 'Completed';
    return {
      formatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOverdue,
    };
  };

  const dueInfo = formatDate(task.due_date);

  return (
    <div className="group relative z-10 hover:z-30 focus-within:z-40 bg-white dark:bg-[#1c2436] border border-slate-200 dark:border-slate-700/60 rounded-md overflow-visible shadow-md dark:shadow-2xl hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col justify-between h-full">
      
      <div>
        {/* Top Hero Cover Image Header */}
        <div className="relative h-44 w-full overflow-hidden rounded-t-md bg-slate-950">
          <img 
            src={coverImage} 
            alt={task.title} 
            className="w-full h-full object-cover rounded-t-md group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => { e.target.src = DEFAULT_COVERS[0]; }}
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Top Left Floating Status Indicator */}
          <div className="absolute top-2.5 left-2.5 z-30">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
              {statusIcons[task.status]}
              <span>{task.status}</span>
            </span>
          </div>

          {/* Top Right Bookmark & Actions Menu */}
          <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5 z-30">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`w-7 h-7 rounded-md backdrop-blur-md flex items-center justify-center transition-all ${
                isBookmarked 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-950/50 text-white/90 hover:bg-slate-950/80 hover:text-white border border-white/10'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-7 h-7 rounded-md bg-slate-950/50 backdrop-blur-md text-white/90 hover:bg-slate-950/80 hover:text-white border border-white/10 flex items-center justify-center transition-all"
              title="More Actions"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {/* Context Menu Dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-8 w-36 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md shadow-2xl z-[100] py-1 text-xs space-y-0.5">
                <button
                  onClick={() => { setShowMenu(false); onEdit(task); }}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Edit Task</span>
                </button>
                <button
                  onClick={() => { setShowMenu(false); onDelete(task.id); }}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 rounded-md"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Left Priority Badge on Cover Image */}
          <div className="absolute bottom-2.5 left-2.5 z-30">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border backdrop-blur-md ${priorityBadgeStyles[task.priority] || priorityBadgeStyles.Medium}`}>
              {task.priority} Priority
            </span>
          </div>
        </div>

        {/* Card Body Area */}
        <div className="p-4 pt-1">
          {/* Title Row */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors mb-1">
            {task.title}
          </h3>

          {/* Description Text */}
          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-300/90 line-clamp-2 mb-3.5 font-normal leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Progress Meter Bar */}
          <div className="mb-4 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                <span>Completion Status</span>
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{currentProgress.label}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden p-0.5">
              <div 
                className={`h-full rounded-md transition-all duration-500 ${currentProgress.color}`} 
                style={{ width: `${currentProgress.pct}%` }} 
              />
            </div>
          </div>

          {/* Column Stacked Badges */}
          <div className="flex flex-col space-y-2 mb-4">
            {dueInfo && (
              <div className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 ${
                dueInfo.isOverdue ? 'text-rose-600 dark:text-rose-300 font-semibold border-rose-500/40' : 'text-slate-700 dark:text-slate-200'
              }`}>
                <span className="text-slate-400 dark:text-slate-400">Target Date</span>
                <div className="flex items-center space-x-1.5">
                  {dueInfo.isOverdue ? <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> : <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />}
                  <span>{dueInfo.formatted}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200">
              <span className="text-slate-400 dark:text-slate-400">Priority Level</span>
              <div className="flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-slate-300" />
                <span>{task.priority} Priority</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Status Control Button Bar */}
      <div className="px-4 pb-4 relative z-30">
        <CustomSelect
          value={task.status}
          onChange={(newVal) => onStatusChange(task.id, newVal)}
          options={statusOptions}
          className="w-full"
          buttonClassName={`w-full justify-between font-extrabold text-xs py-2.5 px-3.5 rounded-md shadow-md transition-all text-center tracking-wide border ${statusButtonStyles[task.status] || statusButtonStyles['To Do']}`}
        />
      </div>

    </div>
  );
}
