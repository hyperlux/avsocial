import React from 'react';
import { Tag } from 'lucide-react';
import { useTheme } from '../../../lib/theme';

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'educational', name: 'Educational' },
  { id: 'spiritual', name: 'Spiritual' },
  { id: 'community', name: 'Community' },
  { id: 'environmental', name: 'Environmental' },
  { id: 'arts', name: 'Arts & Crafts' },
  { id: 'sports', name: 'Sports & Wellness' }
];

interface EventFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function EventFilters({ selectedCategory, onCategoryChange }: EventFiltersProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${
      isDark ? 'bg-dark-card' : 'bg-white'
    } rounded-xl shadow-sm p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-auroville-primary" />
        <h2 className={`font-semibold ${
          isDark ? 'text-dark-primary' : 'text-gray-900'
        }`}>
          Categories
        </h2>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-auroville-light text-auroville-primary'
                : isDark
                  ? 'text-dark-primary hover:bg-dark-lighter'
                  : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}