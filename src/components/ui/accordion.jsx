import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionContext = createContext(null);

/**
 * Shadcn UI Accordion Primitive Components with proper z-index stacking & rounded-md styling
 */
export function Accordion({ children, type = "single", defaultValue, className = "" }) {
  const [openItems, setOpenItems] = useState(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const toggleItem = (value) => {
    if (type === "single") {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`space-y-3 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children, className = "" }) {
  const context = useContext(AccordionContext);
  const isOpen = context?.openItems ? context.openItems.includes(value) : false;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={`rounded-md border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 transition-all relative ${
        isOpen ? 'z-20 focus-within:z-30' : 'z-10'
      } ${className}`}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { value, isOpen }) : child
      )}
    </div>
  );
}

export function AccordionTrigger({ children, value, isOpen, className = "", onClick }) {
  const context = useContext(AccordionContext);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (context && value) context.toggleItem(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-state={isOpen ? "open" : "closed"}
      className={`w-full flex items-center justify-between p-4 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-800/40 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
    >
      <div className="flex items-center space-x-3 flex-1">{children}</div>
      <ChevronDown
        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ml-2 ${
          isOpen ? "rotate-180 text-indigo-500 dark:text-indigo-400" : ""
        }`}
      />
    </button>
  );
}

export function AccordionContent({ children, isOpen, className = "" }) {
  if (!isOpen) return null;

  return (
    <div
      className={`p-4 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40 rounded-b-md animate-fade-in relative z-20 ${className}`}
    >
      {children}
    </div>
  );
}
