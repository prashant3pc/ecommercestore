'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'default';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', e.target.value);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:w-auto">
      {/* Left icon (optional) */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
        </svg>
      </div>

      <select
        value={currentSort}
        onChange={handleSortChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-12 py-3 pr-8 
                   focus:outline-none focus:ring-2 focus:ring-ultraviolet focus:border-ultraviolet 
                   w-full sm:w-auto text-base font-semibold text-gray-700"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value} className="text-base text-gray-700">
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
        <svg
          className="fill-current h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
