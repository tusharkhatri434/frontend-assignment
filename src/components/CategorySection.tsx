import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category } from '../types/widget';
import { useAppDispatch } from '../store/hooks';
import { removeWidget } from '../store/slices/dashboardSlice';
import WidgetCard from './WidgetCard';
import AddWidgetDrawer from './AddWidgetDrawer';

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  // Filter out any remaining add widget placeholders
  const actualWidgets = category.widgets.filter(widget => !widget.showAddButton);

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">{category.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {/* Render actual widgets */}
          {actualWidgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              categoryId={category.id}
              onRemove={handleRemoveWidget}
            />
          ))}
        </AnimatePresence>

        {/* Always render Add Widget box at the end */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 flex items-center justify-center hover:border-blue-400 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              +
            </div>
            <p className="text-sm text-gray-600">Add Widget</p>
          </div>
        </motion.div>

        {/* Empty State - only show if no actual widgets */}
        {actualWidgets.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>No widgets found. Use the "Add Widget" button to create one.</p>
          </div>
        )}
      </div>

      {/* Add Widget Drawer */}
      <AddWidgetDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categoryId={category.id}
      />
    </div>
  );
};

export default CategorySection;
