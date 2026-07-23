import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Custom Shadcn UI Style Select Component with crystal clear contrast in Light & Dark mode
 */
export function CustomSelect({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select...",
  className = "",
  buttonClassName = "",
  size = "md" // "sm" | "md"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || {
    label: value || placeholder,
    value: value,
  };

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const baseButtonClasses = buttonClassName 
    ? buttonClassName 
    : "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900";

  return (
    <div className={`relative inline-block text-left ${isOpen ? 'z-50' : 'z-10'} ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between space-x-2 rounded-md font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
          size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-2 text-xs'
        } ${baseButtonClasses}`}
      >
        <div className="flex items-center space-x-1.5 truncate">
          {selectedOption.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-90 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Options Popup Menu (z-[100] forward stack, rounded-md) */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1 shadow-2xl z-[100] animate-fade-in focus:outline-none space-y-0.5">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  {option.icon && <span className="shrink-0">{option.icon}</span>}
                  <span className="truncate">{option.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
