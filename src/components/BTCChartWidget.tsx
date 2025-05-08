import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BTCChartWidget: React.FC = () => {
  // Get BTC data from Redux (assume first coin is BTC)
  const btc = useSelector((state: RootState) => state.crypto.cryptoList[0]);

  if (!btc) {
    return <div className="h-64 flex items-center justify-center text-gray-400">Loading BTC data...</div>;
  }

  // Prepare chart data
  const chartData = btc.sparkline_in_7d.price.map((price, idx) => ({
    time: idx,
    price,
  }));

  return (
    <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-white">BTC/USD</h2>
          <div className="text-2xl font-semibold text-white mt-2">
            ${btc.current_price.toLocaleString()} <span className={btc.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
              {btc.price_change_percentage_24h >= 0 ? '▲' : '▼'} {btc.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="px-3 py-1 rounded-lg bg-gray-700 text-white">Line chart</button>
          <button className="px-3 py-1 rounded-lg bg-gray-700 text-white">D</button>
          <button className="px-3 py-1 rounded-lg bg-gray-700 text-white">W</button>
          <button className="px-3 py-1 rounded-lg bg-gray-700 text-white">M</button>
          <button className="px-3 py-1 rounded-lg bg-gray-700 text-white">Y</button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default BTCChartWidget; 