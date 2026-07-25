import React from 'react';
import { 
  CheckSquare, 
  LayoutGrid, 
  ListFilter, 
  Layers,
  FolderKanban,
  Plus, 
  LogOut, 
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Top Navbar Header Component with View Switcher (Tabs, Board, Accordion, List) & w-[80%] container width
 */
export function Navbar({ 
  user, 
  onSignOut, 
  viewMode, 
  setViewMode, 
  onOpenCreateModal,
  isDemo 
}) {
  const { theme, toggleTheme } = useTheme();

  const userInitials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'NT';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <div className="w-[80%] mx-auto">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Demo Pill */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-glow">
              <CheckSquare className="w-6 h-6 text-white shrink-0" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-emerald-950 to-emerald-600 dark:from-white dark:via-slate-100 dark:to-emerald-200 bg-clip-text text-transparent">
                  NexuraTask<span className="text-emerald-500 dark:text-emerald-400">Pro</span>
                </span>
                {isDemo && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Zap className="w-3 h-3 mr-1" /> Demo Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Intelligent Task Management System</p>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* View Switcher (4 Tabs View / Kanban Board / Accordion / List) */}
            <div className="bg-slate-100 dark:bg-slate-900/90 p-1 rounded-md border border-slate-200 dark:border-slate-800 flex items-center space-x-1">
              <button
                onClick={() => setViewMode('tabs')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'tabs'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
                title="4 Status Tabs View"
              >
                <FolderKanban className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Tabs</span>
              </button>

              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
                title="Kanban Board View"
              >
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Board</span>
              </button>

              <button
                onClick={() => setViewMode('accordion')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'accordion'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
                title="Accordion View"
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Accordion</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
                title="List View"
              >
                <ListFilter className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">List</span>
              </button>
            </div>

            {/* Dark/Light Mode Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
            </button>

            {/* Create New Task Button */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-glow transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">New Task</span>
            </button>

            {/* Profile Avatar Header & Logout */}
            <div className="flex items-center pl-2 border-l border-slate-200 dark:border-slate-800 space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shadow-inner ring-2 ring-emerald-500/30">
                  {userInitials}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                    {user?.email}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Authenticated</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={onSignOut}
                className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-all"
                title="Log Out"
              >
                <LogOut className="w-4 h-4 shrink-0" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
