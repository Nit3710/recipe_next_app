'use client'

import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-12 group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative flex bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for delicious recipes..."
          className="flex-1 px-6 py-4 bg-transparent outline-none text-lg text-gray-800 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium
                   rounded-r-xl hover:opacity-90 transition-opacity disabled:opacity-50
                   flex items-center gap-2"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}