"use client"
import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

interface TabItemProps {
  value: string;
  label: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children, defaultValue }) => {
  const tabItems = React.Children.toArray(children) as React.ReactElement<TabItemProps>[];
  const [activeTab, setActiveTab] = useState(defaultValue || tabItems[0]?.props.value);

  return (
    <div className="my-6">
      <div className="border-b border-neutral-700">
        <nav className="-mb-px flex space-x-8">
          {tabItems.map((tab) => (
            <button
              key={tab.props.value}
              onClick={() => setActiveTab(tab.props.value)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.props.value
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-neutral-400 hover:text-neutral-300'
              }`}
            >
              {tab.props.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {tabItems.find(tab => tab.props.value === activeTab)?.props.children}
      </div>
    </div>
  );
};

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return <div className="prose prose-neutral prose-invert max-w-none">{children}</div>;
};