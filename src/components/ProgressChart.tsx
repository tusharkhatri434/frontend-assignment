import React from 'react';
import type { ChartData } from '../types/widget';

interface ProgressChartProps {
  data: ChartData[];
  total: number;
  title: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, total, title }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900">{total}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="flex h-2 rounded-full overflow-hidden">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            return (
              <div
                key={index}
                className="h-full"
                style={{
                  backgroundColor: item.color,
                  width: `${percentage}%`
                }}
              />
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;
