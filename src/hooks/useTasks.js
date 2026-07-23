import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const MOCK_TASKS_KEY = 'taskflow_pro_mock_tasks_v2';

const INITIAL_DEMO_TASKS = [
  {
    id: '1',
    user_id: 'demo-user-777',
    title: 'Setup Supabase Database Schema & RLS',
    description: 'Run SQL migration scripts in Supabase editor to configure row-level security and tasks table permissions.',
    priority: 'High',
    status: 'Completed',
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date(Date.now() - 604800000).toISOString()
  },
  {
    id: '2',
    user_id: 'demo-user-777',
    title: 'Design Glassmorphism Dashboard UI',
    description: 'Build responsive task views, priority filter tabs, and dark mode theme controls using Tailwind CSS.',
    priority: 'High',
    status: 'In Progress',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() + 172800000).toISOString(),
    created_at: new Date(Date.now() - 504800000).toISOString()
  },
  {
    id: '3',
    user_id: 'demo-user-777',
    title: 'Integrate Shadcn Accordion Status View',
    description: 'Group tasks under collapsible status accordion sections (Completed, In Progress, To Do, Failed) with smooth animations.',
    priority: 'High',
    status: 'In Progress',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date(Date.now() - 404800000).toISOString()
  },
  {
    id: '4',
    user_id: 'demo-user-777',
    title: 'Legacy SQL Data Batch Migration',
    description: 'Import user historical archives into PostgreSQL database. Encountered foreign key constraints mismatch.',
    priority: 'High',
    status: 'Failed',
    image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() - 172800000).toISOString(),
    created_at: new Date(Date.now() - 304800000).toISOString()
  },
  {
    id: '5',
    user_id: 'demo-user-777',
    title: 'Connect Realtime PostgREST Channels',
    description: 'Implement WebSocket subscribers for automatic cross-client state updates without page refreshes.',
    priority: 'Medium',
    status: 'To Do',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() + 259200000).toISOString(),
    created_at: new Date(Date.now() - 204800000).toISOString()
  },
  {
    id: '6',
    user_id: 'demo-user-777',
    title: 'Automated Cypress E2E Workflow Test Suite',
    description: 'Run automated end-to-end user tests. Failed on Chromium browser headless runner timeout.',
    priority: 'High',
    status: 'Failed',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() - 432000000).toISOString(),
    created_at: new Date(Date.now() - 104800000).toISOString()
  },
  {
    id: '7',
    user_id: 'demo-user-777',
    title: 'Vite Production Chunk Size Optimization',
    description: 'Configure rollup options and dynamic code splitting to optimize bundle loading performance under 150KB.',
    priority: 'Medium',
    status: 'Completed',
    image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() - 259200000).toISOString(),
    created_at: new Date(Date.now() - 94800000).toISOString()
  },
  {
    id: '8',
    user_id: 'demo-user-777',
    title: 'Configure Sentry Error Monitoring & Alerting',
    description: 'Set up real-time error reporting and stack trace tracking for production uncaught exceptions.',
    priority: 'Low',
    status: 'To Do',
    due_date: new Date(Date.now() + 345600000).toISOString(),
    created_at: new Date(Date.now() - 84800000).toISOString()
  },
  {
    id: '9',
    user_id: 'demo-user-777',
    title: 'Stripe Subscription Billing & Webhook Processor',
    description: 'Process incoming Stripe customer events for tier upgrades. Webhook signature validation failed on test key.',
    priority: 'High',
    status: 'Failed',
    image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&auto=format&fit=crop&q=80',
    due_date: new Date(Date.now() - 864000000).toISOString(),
    created_at: new Date(Date.now() - 74800000).toISOString()
  },
  {
    id: '10',
    user_id: 'demo-user-777',
    title: 'Prepare AI Pair-Programming Reflection Report',
    description: 'Draft comprehensive assignment report detailing prompts used, architecture decisions, and security audit results.',
    priority: 'Low',
    status: 'Completed',
    image_url: '',
    due_date: new Date(Date.now() - 100000000).toISOString(),
    created_at: new Date(Date.now() - 64800000).toISOString()
  },
  {
    id: '11',
    user_id: 'demo-user-777',
    title: 'Mobile Touch Drag-and-Drop Optimization',
    description: 'Implement polyfill touch event listeners for HTML5 drag-and-drop support on mobile browsers.',
    priority: 'Medium',
    status: 'In Progress',
    image_url: '',
    due_date: new Date(Date.now() + 432000000).toISOString(),
    created_at: new Date(Date.now() - 54800000).toISOString()
  },
  {
    id: '12',
    user_id: 'demo-user-777',
    title: 'Accessibility (a11y) & Keyboard Audit',
    description: 'Add ARIA attributes, semantic landmarks, and visible focus rings across all interactive buttons and modals.',
    priority: 'Low',
    status: 'To Do',
    image_url: '',
    due_date: new Date(Date.now() + 518400000).toISOString(),
    created_at: new Date(Date.now() - 44800000).toISOString()
  }
];

/**
 * Custom hook for full Task Management (CRUD, Search, Priority Filters, Real-Time Subscriptions).
 */
export function useTasks(user) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Fetch tasks from Supabase or LocalStorage
  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(MOCK_TASKS_KEY);
      if (stored) {
        try {
          setTasks(JSON.parse(stored));
        } catch {
          setTasks(INITIAL_DEMO_TASKS);
          localStorage.setItem(MOCK_TASKS_KEY, JSON.stringify(INITIAL_DEMO_TASKS));
        }
      } else {
        setTasks(INITIAL_DEMO_TASKS);
        localStorage.setItem(MOCK_TASKS_KEY, JSON.stringify(INITIAL_DEMO_TASKS));
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchErr } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;
      setTasks(data || []);
    } catch (err) {
      console.error('Error loading tasks:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch and Realtime PostgREST channel listener
  useEffect(() => {
    fetchTasks();

    if (!isSupabaseConfigured || !user) return;

    const channel = supabase
      .channel(`user-tasks-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchTasks]);

  const persistMockTasks = (updatedList) => {
    setTasks(updatedList);
    localStorage.setItem(MOCK_TASKS_KEY, JSON.stringify(updatedList));
  };

  // Add task
  const addTask = async (taskData) => {
    if (!user) return { data: null, error: 'User not authenticated' };

    const newTask = {
      ...taskData,
      user_id: user.id,
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured) {
      const created = { ...newTask, id: 'task_' + Date.now() };
      const updated = [created, ...tasks];
      persistMockTasks(updated);
      return { data: created, error: null };
    }

    try {
      const { data, error: insertErr } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (insertErr) throw insertErr;
      setTasks((prev) => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    if (!isSupabaseConfigured) {
      const updated = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
      persistMockTasks(updated);
      return { error: null };
    }

    // Optimistic Update
    const previousTasks = [...tasks];
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));

    try {
      const { error: updateErr } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);

      if (updateErr) {
        setTasks(previousTasks);
        throw updateErr;
      }
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  // Update status shortcut
  const updateTaskStatus = async (id, newStatus) => {
    return updateTask(id, { status: newStatus });
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!isSupabaseConfigured) {
      const updated = tasks.filter((t) => t.id !== id);
      persistMockTasks(updated);
      return { error: null };
    }

    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      const { error: deleteErr } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (deleteErr) {
        setTasks(previousTasks);
        throw deleteErr;
      }
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  // Filter tasks based on Search Query & Priority Filter
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const titleMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = task.description ? task.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const matchesSearch = titleMatch || descMatch;

      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  return {
    tasks: filteredTasks,
    totalCount: tasks.length,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    refetch: fetchTasks,
  };
}
