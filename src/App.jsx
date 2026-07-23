import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { Navbar } from './components/Navbar';
import { AuthForm } from './components/AuthForm';
import { TabsView } from './components/TabsView';
import { KanbanBoard } from './components/KanbanBoard';
import { AccordionView } from './components/AccordionView';
import { ListView } from './components/ListView';
import { TaskModal } from './components/TaskModal';
import { Toast } from './components/Toast';


export function App() {
  const { user, loading: authLoading, signUp, signIn, signOut, isDemo } = useAuth();
  const {
    tasks,
    totalCount,
    loading: tasksLoading,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks(user);

  // UI State - 'tabs' | 'kanban' | 'accordion' | 'list'
  const [viewMode, setViewMode] = useState('tabs');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  // Handlers
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskPayload) => {
    if (taskToEdit) {
      const res = await updateTask(taskToEdit.id, taskPayload);
      if (res.error) {
        showToast('error', `Failed to update task: ${res.error}`);
        return res;
      }
      showToast('success', 'Task updated successfully!');
      return { error: null };
    } else {
      const res = await addTask(taskPayload);
      if (res.error) {
        showToast('error', `Failed to create task: ${res.error}`);
        return res;
      }
      showToast('success', 'New task created successfully!');
      return { error: null };
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await updateTaskStatus(id, newStatus);
    if (res.error) {
      showToast('error', `Failed to update status: ${res.error}`);
    } else {
      showToast('info', `Task status updated to "${newStatus}"`);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const res = await deleteTask(id);
      if (res.error) {
        showToast('error', `Failed to delete task: ${res.error}`);
      } else {
        showToast('success', 'Task deleted successfully.');
      }
    }
  };

  // Loading Skeleton View with rounded-md styling
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-md animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading TaskFlow Pro...</p>
      </div>
    );
  }

  // Unauthenticated Route -> Show Auth Form
  if (!user) {
    return <AuthForm onSignIn={signIn} onSignUp={signUp} isDemo={isDemo} />;
  }

  // Main Authenticated Dashboard with w-[80%] container width
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">

      {/* Top Header Navbar */}
      <Navbar
        user={user}
        onSignOut={() => {
          signOut();
          showToast('info', 'Logged out successfully.');
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCreateModal={handleOpenCreateModal}
        isDemo={isDemo}
      />

      {/* Main Container with w-[80%] width */}
      <main className="flex-1 w-[80%] mx-auto py-8">

        {/* Dashboard View (Tabs View vs Kanban Board vs Accordion View vs List View) */}
        {tasksLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-md bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 p-4 space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
                <div className="h-28 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                <div className="h-28 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
              </div>
            ))}
          </div>
        ) : viewMode === 'tabs' ? (
          <TabsView
            tasks={tasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onOpenCreateModal={handleOpenCreateModal}
          />
        ) : viewMode === 'kanban' ? (
          <KanbanBoard
            tasks={tasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onOpenCreateModal={handleOpenCreateModal}
          />
        ) : viewMode === 'accordion' ? (
          <AccordionView
            tasks={tasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onOpenCreateModal={handleOpenCreateModal}
          />
        ) : (
          <ListView
            tasks={tasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}

      </main>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Interactive Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

export default App;
