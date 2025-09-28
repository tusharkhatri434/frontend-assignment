import type { Category } from '../types/widget';

export const initialDashboard: Category[] = [
  {
    id: 'cspm-executive',
    name: 'CSPM Executive Dashboard',
    widgets: [
      {
        id: 'cloud-accounts',
        name: 'Cloud Accounts',
        text: 'Connected (2) | Not Connected (2)',
        type: 'donut',
        total: 2,
        data: [
          { name: 'Connected', value: 2, color: '#3B82F6' },
          { name: 'Not Connected', value: 2, color: '#E5E7EB' }
        ]
      },
      {
        id: 'cloud-account-risk',
        name: 'Cloud Account Risk Assessment',
        text: 'Failed (1689) | Warning (681) | Not available (36) | Passed (7253)',
        type: 'donut',
        total: 9659,
        data: [
          { name: 'Failed', value: 1689, color: '#EF4444' },
          { name: 'Warning', value: 681, color: '#F59E0B' },
          { name: 'Not available', value: 36, color: '#9CA3AF' },
          { name: 'Passed', value: 7253, color: '#10B981' }
        ]
      }
    ]
  },
  {
    id: 'cwpp-dashboard',
    name: 'CWPP Dashboard',
    widgets: [
      {
        id: 'top-5-namespace',
        name: 'Top 5 Namespace Specific Alerts',
        text: 'No Graph data available!',
        type: 'bar',
        data: []
      },
      {
        id: 'workload-alerts',
        name: 'Workload Alerts',
        text: 'No Graph data available!',
        type: 'bar',
        data: []
      }
    ]
  },
  {
    id: 'registry-scan',
    name: 'Registry Scan',
    widgets: [
      {
        id: 'image-risk',
        name: 'Image Risk Assessment',
        text: 'Total Vulnerabilities',
        type: 'progress',
        total: 1470,
        data: [
          { name: 'Critical', value: 9, color: '#DC2626' },
          { name: 'High', value: 150, color: '#EA580C' }
        ]
      },
      {
        id: 'image-security',
        name: 'Image Security Issues',
        text: 'Total Images',
        type: 'progress',
        total: 2,
        data: [
          { name: 'Critical', value: 2, color: '#DC2626' },
          { name: 'High', value: 2, color: '#EA580C' }
        ]
      }
    ]
  }
];
