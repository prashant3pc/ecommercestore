'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nameFilter, setNameFilter] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const name = searchParams.get('name') || '';
    setNameFilter(name);
  }, [searchParams]);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameFilter(e.target.value);

  const applyNameFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (nameFilter.trim()) params.set('name', nameFilter.trim());
    else params.delete('name');
    params.delete('search');
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setNameFilter('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('name');
    router.push('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter') applyNameFilter(); };

  return (
    <div className="bg-background p-4 sm:p-6 rounded-lg shadow border border-purple-200">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center">
          Filter Products
        </h3>
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Name Filter */}
      <div>
        <h4 className="font-medium text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Search by name</h4>
        <div className="space-y-2 sm:space-y-3">
          <div className="relative">
            <input
              type="text"
              value={nameFilter}
              onChange={handleNameFilterChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter product name..."
              className="w-full pl-3 pr-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base bg-background text-foreground"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyNameFilter}
              className="flex-1 px-3 sm:px-4 py-2 bg-accent text-foreground rounded-lg hover:bg-highlight transition-colors text-sm sm:text-base font-medium"
            >
              Apply Filter
            </button>
            {isMobile && nameFilter && (
              <button
                type="button"
                onClick={() => {
                  setNameFilter('');
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('name');
                  router.push(`/?${params.toString()}`);
                }}
                className="px-3 py-2 border border-purple-300 text-foreground rounded-lg hover:bg-accent text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {nameFilter && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-purple-200">
          <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Active Filter</h4>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-accent text-foreground text-xs sm:text-sm rounded-full font-medium">
              Name: {nameFilter.length > 15 ? `${nameFilter.substring(0, 15)}...` : nameFilter}
            </span>
            <button
              type="button"
              onClick={() => {
                setNameFilter('');
                const params = new URLSearchParams(searchParams.toString());
                params.delete('name');
                router.push(`/?${params.toString()}`);
              }}
              className="text-sm text-red-500 hover:text-red-700 p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {isMobile && !nameFilter && (
        <div className="mt-4 text-xs text-foreground text-center">
          <p>Enter a product name and apply filter to search</p>
        </div>
      )}
    </div>
  );
}
