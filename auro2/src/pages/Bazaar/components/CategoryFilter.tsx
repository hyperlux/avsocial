import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-auroville-primary" />
        <h2 className="font-semibold text-gray-900">Categories</h2>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selected === category
                ? 'bg-auroville-light text-auroville-primary'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}