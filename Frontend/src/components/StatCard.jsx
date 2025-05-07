import React from 'react';

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#292929] p-6 rounded-lg shadow-md w-full md:w-1/3 mb-6">
      <h3 className="text-xl text-[#ADD8E6] mb-4">{title}</h3>
      <p className="text-2xl text-[#ffffff]">{value}</p>
    </div>
  );
};

export default StatCard;
