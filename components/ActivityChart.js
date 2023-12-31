import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IconContext } from "react-icons";
import { BiArrowBack } from 'react-icons/bi';

export default function ActivityChart({ isOpen, onClose, allActivities }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (allActivities) {
      const sortedActivities = Object.values(allActivities).sort((a, b) =>
        new Date(b.day) - new Date(a.day)
      );

      const sortedActivitiesLength = sortedActivities.length
      const sortedActivitiesLast7Days = sortedActivitiesLength - 7
      
      const last7Activities = sortedActivities.slice(sortedActivitiesLast7Days, sortedActivitiesLength);

      const mappedData = last7Activities.map((activity) => ({
        Atividades: activity.counter,
        dia: activity.day
      }));
      
      setData(mappedData);
    }
  }, [allActivities]);


  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-10">
        <button
          className="flex px-4 py-2 hover:scale-125 duration-300"
          onClick={onClose}
        >
          <IconContext.Provider value={{ size: "20px" }}>
            <BiArrowBack />
          </IconContext.Provider>
          Voltar
        </button>
        <h1 className="text-xl text-center font-medium mb-4">Atividades nos Últimos 7 Dias</h1>
        <div className="w-96 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Atividades" fill="#0284c7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
