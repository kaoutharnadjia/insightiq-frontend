import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import AIStatusPill from './AIStatusPill';
import ChatWidget from './ChatWidget';

const Layout = ({ children, erpType, title }) => {
  return (
    <div className="min-h-screen bg-bg-main font-sans text-text-primary pb-32">
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
        <Header erpType={erpType} />
        
        <div className="px-4 md:px-8 mb-6">
          <AIStatusPill active={true} />
        </div>

        <main className="flex-grow px-4 md:px-8">
          {children}
        </main>

        <BottomNav />
        <ChatWidget erpType={erpType} />
      </div>
    </div>
  );
};

export default Layout;
