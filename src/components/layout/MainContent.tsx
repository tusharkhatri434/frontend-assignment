import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectFilteredCategories } from '../../store/slices/dashboardSlice';
import CategoryManager from '../CategoryManager';
import CategorySection from '../CategorySection';

const MainContent: React.FC = () => {
  const filteredCategories = useAppSelector(selectFilteredCategories);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Manager */}
      <CategoryManager />

      {/* Categories */}
      <div className="space-y-6">
        {filteredCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No widgets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search query or add new widgets to get started.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
