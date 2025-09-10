import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const BarGraphPopup = ({ date, data, onClose }) => {
  const formattedData = data.map((item, index) => ({
    user: Object.keys(item)[0],
    value: Object.values(item)[0],
  }));

  return (
    <div className="popup">
      <h3>Data for {date}</h3>
      <button onClick={onClose}>Close</button>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraphPopup;
