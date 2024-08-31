import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {React.Children.map(children, (child, index) => (
          <button
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.map(children, (child, index) =>
          activeTab === index ? child : null
        )}
      </div>
    </div>
  );
};

export default Tabs;