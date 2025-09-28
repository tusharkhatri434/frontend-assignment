import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectCategories, addWidget } from '../store/slices/dashboardSlice';
import { generateId } from '../utils/helpers';

interface AddWidgetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}

const AddWidgetDrawer: React.FC<AddWidgetDrawerProps> = ({
  isOpen,
  onClose,
  categoryId,
}) => {
  const [drawerType, setDrawerType] = useState<'selection' | 'custom'>('selection');
  const [activeTab, setActiveTab] = useState('CSPM');
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const tabs = ['CSPM', 'CWPP', 'Image', 'Ticket'];
  
  const availableWidgets = {
    CSPM: [
      { id: 'cloud-accounts', name: 'Cloud Accounts', text: 'Monitor your cloud account connections and status' },
      { id: 'cloud-account-risk', name: 'Cloud Account Risk Assessment', text: 'Track security risks across your cloud infrastructure' },
      { id: 'compliance-status', name: 'Compliance Status', text: 'Monitor compliance with security standards' },
      { id: 'security-score', name: 'Security Score', text: 'Overall security posture rating' },
    ],
    CWPP: [
      { id: 'top-5-namespace', name: 'Top 5 Namespace Specific Alerts', text: 'Critical alerts by Kubernetes namespace' },
      { id: 'workload-alerts', name: 'Workload Alerts', text: 'Security alerts for running workloads' },
      { id: 'container-security', name: 'Container Security', text: 'Security status of container deployments' },
      { id: 'runtime-protection', name: 'Runtime Protection', text: 'Real-time threat detection and response' },
    ],
    Image: [
      { id: 'image-risk', name: 'Image Risk Assessment', text: 'Vulnerability assessment for container images' },
      { id: 'image-security', name: 'Image Security Issues', text: 'Security issues found in container images' },
      { id: 'registry-scan', name: 'Registry Scan Results', text: 'Latest scan results from image registry' },
      { id: 'malware-detection', name: 'Malware Detection', text: 'Malware threats detected in images' },
    ],
    Ticket: [
      { id: 'ticket-status', name: 'Ticket Status', text: 'Current status of security tickets' },
      { id: 'ticket-priority', name: 'Ticket Priority', text: 'Priority distribution of open tickets' },
      { id: 'sla-compliance', name: 'SLA Compliance', text: 'Ticket resolution SLA performance' },
      { id: 'escalation-queue', name: 'Escalation Queue', text: 'Tickets requiring escalation' },
    ]
  };

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleConfirm = () => {
    if (drawerType === 'custom') {
      if (!widgetName.trim() || !widgetText.trim()) {
        return;
      }
      
      const newWidget = {
        id: generateId(),
        name: widgetName.trim(),
        text: widgetText.trim(),
        type: 'text' as const,
      };
      dispatch(addWidget({ categoryId, widget: newWidget }));
      
      setWidgetName('');
      setWidgetText('');
    } else {
      selectedWidgets.forEach(widgetId => {
        const widget = Object.values(availableWidgets).flat().find(w => w.id === widgetId);
        if (widget) {
          const newWidget = {
            id: generateId(),
            name: widget.name,
            text: widget.text,
            type: 'text' as const,
          };
          dispatch(addWidget({ categoryId, widget: newWidget }));
        }
      });
      
      setSelectedWidgets([]);
    }
    
    onClose();
  };

  const handleClose = () => {
    setSelectedWidgets([]);
    setWidgetName('');
    setWidgetText('');
    setDrawerType('selection');
    onClose();
  };

  // Check if widget is already in the category
  const isWidgetInCategory = (widgetId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.widgets.some(widget => widget.id === widgetId) || false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold text-gray-900">Add Widget</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close drawer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-6">
                    Personalise your dashboard by adding widgets
                  </p>

                  {/* Mode Toggle */}
                  <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setDrawerType('selection')}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        drawerType === 'selection'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Select from Library
                    </button>
                    <button
                      onClick={() => setDrawerType('custom')}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        drawerType === 'custom'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Create Custom
                    </button>
                  </div>

                  {drawerType === 'selection' ? (
                    <>
                      {/* Category Tabs */}
                      <div className="grid grid-cols-2 gap-1 mb-6 bg-gray-50 p-1 rounded-lg">
                        {tabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                              activeTab === tab
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Widget List */}
                      <div className="space-y-3">
                        {availableWidgets[activeTab as keyof typeof availableWidgets]?.map((widget) => (
                          <label
                            key={widget.id}
                            className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedWidgets.includes(widget.id) || isWidgetInCategory(widget.id)}
                              onChange={() => handleWidgetToggle(widget.id)}
                              disabled={isWidgetInCategory(widget.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                            />
                            <div className="flex-1">
                              <div className={`text-sm font-medium ${isWidgetInCategory(widget.id) ? 'text-gray-400' : 'text-gray-900'}`}>
                                {widget.name}
                              </div>
                              <div className={`text-xs mt-1 ${isWidgetInCategory(widget.id) ? 'text-gray-300' : 'text-gray-500'}`}>
                                {widget.text}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Custom Widget Form */}
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="widgetName" className="block text-sm font-medium text-gray-700 mb-2">
                            Widget Name
                          </label>
                          <input
                            type="text"
                            id="widgetName"
                            value={widgetName}
                            onChange={(e) => setWidgetName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter widget name"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="widgetText" className="block text-sm font-medium text-gray-700 mb-2">
                            Widget Text
                          </label>
                          <textarea
                            id="widgetText"
                            value={widgetText}
                            onChange={(e) => setWidgetText(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter widget description or content"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={drawerType === 'custom' && (!widgetName.trim() || !widgetText.trim())}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {drawerType === 'custom' ? 'Add Widget' : 'Confirm'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddWidgetDrawer;
