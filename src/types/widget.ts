export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'donut' | 'bar' | 'progress' | 'text';
  data?: ChartData[];
  total?: number;
  showAddButton?: boolean;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}
