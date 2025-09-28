import React from 'react';
import Header from '../components/layout/Header';
import MainContent from '../components/layout/MainContent';
import AddWidgetDrawer from '../components/AddWidgetDrawer';
import { useDrawer } from '../hooks/useDrawer';

const Dashboard: React.FC = () => {
  const addWidgetDrawer = useDrawer();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddWidget={addWidgetDrawer.open} />
      <MainContent />
      
      {/* Add Widget Drawer */}
      <AddWidgetDrawer
        isOpen={addWidgetDrawer.isOpen}
        onClose={addWidgetDrawer.close}
        categoryId="cspm-executive"
      />
    </div>
  );
};

export default Dashboard;
