import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectCategories, toggleWidgetInCategory } from '../store/slices/dashboardSlice';
import type { Widget } from '../types/widget';

const CategoryManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  // Get all unique widgets across all categories
  const getAllAvailableWidgets = (): Widget[] => {
    const allWidgets: Widget[] = [];
    const seenIds = new Set<string>();

    categories.forEach((category) => {
      category.widgets.forEach((widget) => {
        // Filter out placeholder widgets and widgets with empty names/text
        if (!seenIds.has(widget.id) && 
            widget.name.trim() !== '' && 
            widget.text.trim() !== '' && 
            !widget.showAddButton) {
          seenIds.add(widget.id);
          allWidgets.push(widget);
        }
      });
    });

    // Add some predefined widgets that can be toggled
    const predefinedWidgets: Widget[] = [
      {
        id: 'predefined-security-score',
        name: 'Security Score',
        text: 'Overall security score: 85/100',
        type: 'text'
      },
      {
        id: 'predefined-compliance',
        name: 'Compliance Status',
        text: 'Compliance rate: 92% | Non-compliant: 8%',
        type: 'text'
      },
      {
        id: 'predefined-threats',
        name: 'Active Threats',
        text: 'Active threats detected: 3 | Resolved: 15',
        type: 'text'
      },
      {
        id: 'predefined-performance',
        name: 'Performance Metrics',
        text: 'CPU: 65% | Memory: 78% | Network: 45%',
        type: 'text'
      }
    ];

    predefinedWidgets.forEach((widget) => {
      if (!seenIds.has(widget.id)) {
        allWidgets.push(widget);
      }
    });

    return allWidgets;
  };

  const availableWidgets = getAllAvailableWidgets();

  const isWidgetInCategory = (categoryId: string, widgetId: string): boolean => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.widgets.some((widget) => widget.id === widgetId) || false;
  };

  const handleToggleWidget = (categoryId: string, widget: Widget) => {
    dispatch(toggleWidgetInCategory({ categoryId, widget }));
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg p-4 flex items-center justify-between text-left"
      >
        <h2 className="text-lg font-semibold text-gray-800">Manage Categories</h2>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg mt-2 overflow-hidden"
          >
            <div className="p-6">
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h3 className="font-medium text-gray-800 mb-3">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availableWidgets.map((widget) => (
                        <label
                          key={`${category.id}-${widget.id}`}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isWidgetInCategory(category.id, widget.id)}
                            onChange={() => handleToggleWidget(category.id, widget)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {widget.name}
                            </p>
                            {widget.text && widget.text.trim() && (
                              <p className="text-xs text-gray-500 truncate">
                                {widget.text}
                              </p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;
