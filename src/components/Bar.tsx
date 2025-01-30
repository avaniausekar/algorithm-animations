import React from 'react';

interface BarProps {
  value: number;
}

const Bar: React.FC<BarProps> = ({ value }) => {
  return (
    <div
      style={{ height: `${value}px` }}
      className="bg-teal-500 w-4 rounded"
    ></div>
  );
};

export default Bar;
