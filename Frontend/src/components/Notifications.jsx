import React from 'react';

const Notifications = ({ items }) => {
  return (
    <div className="bg-[#1e1e1e] p-6 rounded-lg">
      <h3 className="text-2xl text-[#ADD8E6] mb-4">Notifications</h3>
      <ul className="list-none p-0">
        {items.map((item, index) => (
          <li key={index} className="bg-[#292929] p-4 mb-3 rounded-md">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
