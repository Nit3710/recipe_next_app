'use client'

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBoxProps {
  onSearch: (query: string) => Promise<void>;
  isLoading: boolean;
}

export default function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-4 sm:px-0 sm:max-w-2xl mx-auto mb-8 sm:mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg sm:rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-transparent outline-none text-base sm:text-lg 
                     text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-teal-500 
                     text-white font-medium text-base sm:text-lg hover:opacity-90 transition-opacity 
                     disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FiSearch className="w-5 h-5" />
            <span className="sm:inline hidden">
              {isLoading ? 'Searching...' : 'Search'}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}