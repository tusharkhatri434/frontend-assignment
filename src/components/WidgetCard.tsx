import React from 'react';
import { motion } from 'framer-motion';
import type { Widget } from '../types/widget';
import DonutChart from './DonutChart';
import ProgressChart from './ProgressChart';
import EmptyChart from './EmptyChart';

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
  onRemove: (categoryId: string, widgetId: string) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, categoryId, onRemove }) => {
  const renderChart = () => {
    switch (widget.type) {
      case 'donut':
        return widget.data && widget.total ? (
          <DonutChart data={widget.data} total={widget.total} />
        ) : (
          <EmptyChart message="No data available" />
        );
      
      case 'progress':
        return widget.data && widget.total ? (
          <ProgressChart data={widget.data} total={widget.total} title={widget.text} />
        ) : (
          <EmptyChart message="No data available" />
        );
      
      case 'bar':
        return <EmptyChart message={widget.text} />;
      
      default:
        return (
          <p className="text-gray-600 text-sm leading-relaxed">
            {widget.text}
          </p>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative group hover:shadow-md transition-shadow duration-200"
    >
      <button
        onClick={() => onRemove(categoryId, widget.id)}
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Remove widget"
      >
        ✕
      </button>
      
      <div className="pr-8">
        <h3 className="font-medium text-gray-900 mb-4 text-sm">
          {widget.name}
        </h3>
        <div className="mt-2">
          {renderChart()}
        </div>
      </div>
    </motion.div>
  );
};

export default WidgetCard;
