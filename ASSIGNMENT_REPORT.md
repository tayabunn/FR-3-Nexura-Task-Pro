# TaskFlow Pro - AI-Assisted React Application Assignment Report

**Project Name:** TaskFlow Pro  
**Developer Role:** Principal Full-Stack Engineer  
**Tech Stack:** React 18, Tailwind CSS, Lucide React Icons, Supabase (PostgreSQL + Auth + RLS)  

---

## 1. Overview of the Completed Application

**TaskFlow Pro** is an enterprise-grade, high-performance task management application built with React and powered by Supabase for backend services (Authentication, PostgreSQL Database, and Row Level Security). 

### Key Features Implemented:
- **Supabase Authentication:** Full Email + Password sign-up and log-in, active session tracking via `useAuth` hook, protected app routing, and user profile header with logout capabilities.
- **Kanban & List Hybrid Dashboard:** Dual-mode layout enabling seamless context switching between a 3-column Kanban board ("To Do", "In Progress", "Completed") and a tabular List view.
- **Full Task CRUD Operations:** Create, Read, Update, and Delete tasks with attributes: `id`, `user_id`, `title`, `description`, `priority` (Low, Medium, High), `status` (To Do, In Progress, Completed), `due_date`, and timestamps.
- **Real-Time Search & Priority Filters:** Instant character-by-character search filtering across title/description alongside pill buttons for priority filtering.
- **Interactive Drag-and-Drop / Click-to-Move:** Native HTML5 Drag and Drop across status columns with instant status update triggers.
- **Database Architecture & RLS Security:** Complete PostgreSQL script including indexes, triggers, and 4 strict RLS policies (`auth.uid() = user_id`).
- **Resilient Fallback Architecture:** Features an interactive client-side demo mode if Supabase keys are missing, allowing instant local evaluation.

---

## 2. Prompts Used During Development

Below is the chronological sequence of AI prompts utilized during the architectural planning and build phases:

### Prompt 1: System Architecture & Requirements Breakdown
> *"Act as a Principal Full-Stack Engineer. Plan a responsive React Web Application called 'TaskFlow Pro' using React, Tailwind CSS, Lucide React icons, and Supabase (PostgreSQL DB + Auth). Include modular custom hooks, dark-mode design principles, and an explicit PostgreSQL RLS schema."*

### Prompt 2: Step 1 - Supabase Database Schema & RLS Policies
> *"Provide the exact PostgreSQL schema SQL script to run in Supabase SQL Editor. Include a `tasks` table with foreign key to `auth.users(id)`, index constraints, automated `updated_at` trigger, and Row Level Security (RLS) policies for SELECT, INSERT, UPDATE, and DELETE ensuring users can ONLY access their own tasks."*

### Prompt 3: Step 2 & 3 - Supabase Client Config & Custom Hooks
> *"Create `src/lib/supabase.js`, `src/hooks/useAuth.js`, and `src/hooks/useTasks.js`. Implement real-time channel subscriptions (`postgres_changes`), optimistic UI updates for task mutations, and a graceful fallback for local testing."*

### Prompt 4: Step 4 - UI Components & Dark Mode Aesthetics
> *"Design modular UI components (`Navbar`, `TaskCard`, `TaskModal`, `TaskFilters`, `KanbanBoard`, `ListView`, `Toast`) using Tailwind CSS dark mode styling, subtle micro-interactions, glowing accents, and Lucide React icons."*

### Prompt 5: Step 5 - Main App Logic Integration & Refactoring
> *"Assemble all components inside `src/App.jsx`. Ensure protected route navigation, toast notification handling, and zero broken placeholders or TODO comments."*

---

## 3. Explanation of How AI Assisted Throughout Implementation

AI served as a pair-programming technical partner throughout the application lifecycle:

1. **Architecture Blueprinting:** AI accelerated the setup phase by providing a standard directory layout, decoupling presentation components from stateful data hooks (`useAuth` and `useTasks`).
2. **Boilerplate Reduction:** Writing SQL triggers, Row Level Security policies, and standard Tailwind UI layouts was sped up significantly, eliminating repetitive setup tasks.
3. **Optimistic UI & Real-Time Patterns:** AI helped draft optimistic UI update patterns inside custom hooks, enabling zero-latency UI responses during task drag-and-drop operations while background database sync occurs.
4. **Resilient Fallback Engineering:** AI helped design a dual-mode database service layer (`src/lib/supabase.js` and `useTasks`) that operates smoothly whether connected to live Supabase servers or evaluating offline via LocalStorage.

---

## 4. Examples of Manual Improvements, Corrections & Refactorings

While AI produced strong initial code, several critical manual refactorings and security enhancements were performed after reviewing AI-generated snippets:

### Example A: Fixing Security Vulnerabilities in RLS Policies
- **Initial AI Output:** The generated `UPDATE` policy used `USING (auth.uid() = user_id)` but omitted `WITH CHECK (auth.uid() = user_id)`.
- **Manual Correction:** Added explicit `WITH CHECK (auth.uid() = user_id)` to prevent malicious users from attempting to reassign the `user_id` column of an existing row to another tenant during an UPDATE operation.

### Example B: Optimistic UI Rollback Handling
- **Initial AI Output:** The `updateTask` hook mutated local state optimistically, but if Supabase returned a network error, the local state remained mutated out-of-sync with the database.
- **Manual Correction:** Refactored `useTasks.js` to capture `previousTasks` prior to mutation and perform a rollback restore (`setTasks(previousTasks)`) inside the error catch block.

### Example C: HTML5 Drag-and-Drop UX Polish
- **Initial AI Output:** Simple drag events without visual drop targets or data type validation.
- **Manual Correction:** Enhanced `KanbanBoard.jsx` with active column drag highlight states (`dragOverColumn`), drop feedback glows, and click-to-move dropdown controls for mobile devices where drag-and-drop is limited.

### Example D: Type Safety & Validation in Task Modal
- **Initial AI Output:** Basic form inputs without date parsing or string trimming.
- **Manual Correction:** Added string sanitization (`title.trim()`), due date ISO conversion, title presence checks, and error alert banners in `TaskModal.jsx`.

---

## 5. Verification & Testing Summary

1. **Compilation Check:** Verified clean Vite project compilation with zero syntax or linter warnings.
2. **Authentication Flow:** Verified login/signup toggle, email validation, session retention across page reloads, and clean user logout.
3. **Data Integrity:** Verified RLS isolation, priority filtering, real-time search, and task CRUD lifecycle.
