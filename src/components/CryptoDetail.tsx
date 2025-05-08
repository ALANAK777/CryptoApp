import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoDetail = () => {
  const selectedCrypto = useSelector((state: RootState) => state.crypto.selectedCrypto);

  if (!selectedCrypto) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 h-full flex items-center justify-center">
        <p className="text-gray-400">Select a cryptocurrency to view details</p>
      </div>
    );
  }

  const chartData = selectedCrypto.sparkline_in_7d.price.map((price, index) => ({
    time: index,
    price: price,
  }));

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{selectedCrypto.name}</h2>
        <p className="text-gray-400">{selectedCrypto.symbol.toUpperCase()}</p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 mb-1">Current Price</p>
            <p className="text-xl font-bold">${selectedCrypto.current_price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">24h Change</p>
            <p className={`text-xl font-bold ${selectedCrypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Market Cap</p>
            <p className="text-xl font-bold">${selectedCrypto.market_cap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">24h Volume</p>
            <p className="text-xl font-bold">${selectedCrypto.total_volume.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Price History (7 Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} />
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
      </div>
    </div>
  );
};

export default CryptoDetail; 