import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
          <span className="text-sm text-gray-600 mr-3 whitespace-nowrap">Department:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-primary-100 text-primary-800 border border-primary-300'
                  : 'text-blue-600 hover:text-primary-600 hover:underline'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}