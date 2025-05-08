import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setSelectedCrypto, setCryptoList } from '../store/cryptoSlice';
import { sampleCryptoData } from '../sampleCryptoData';

const columns = [
  '#', 'Logo', 'Name', 'Price', '1h %', '24h %', '7d %', 'Market Cap', '24h Volume', 'Circulating Supply', 'Max Supply', '7D Chart'
];

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch();
  const cryptoList = useSelector((state: RootState) => state.crypto.cryptoList);

  useEffect(() => {
    if (cryptoList.length === 0) {
      dispatch(setCryptoList(sampleCryptoData));
    }
  }, [cryptoList.length, dispatch]);

  return (
    <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg mt-8">
      <h3 className="text-xl font-bold text-white mb-4">Market Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-700">
              {columns.map((col) => (
                <th key={col} className="py-2 px-4 text-gray-300 font-semibold whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cryptoList.map((crypto, idx) => (
              <tr
                key={crypto.id}
                className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition"
                onClick={() => dispatch(setSelectedCrypto(crypto))}
              >
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4"><img src={crypto.image || '/vite.svg'} alt={crypto.symbol} className="w-6 h-6" /></td>
                <td className="py-2 px-4">
                  <span className="font-medium text-white">{crypto.name}</span>
                  <span className="text-gray-400 ml-2">{crypto.symbol.toUpperCase()}</span>
                </td>
                <td className="py-2 px-4 text-white">${crypto.current_price.toLocaleString()}</td>
                <td
                  className={`py-2 px-4 ${
                    typeof crypto.price_change_percentage_1h_in_currency === 'number'
                      ? crypto.price_change_percentage_1h_in_currency >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {crypto.price_change_percentage_1h_in_currency?.toFixed(2) ?? '--'}%
                </td>
                <td className={`py-2 px-4 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{crypto.price_change_percentage_24h?.toFixed(2) ?? '--'}%</td>
                <td
                  className={`py-2 px-4 ${
                    typeof crypto.price_change_percentage_7d_in_currency === 'number'
                      ? crypto.price_change_percentage_7d_in_currency >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {crypto.price_change_percentage_7d_in_currency?.toFixed(2) ?? '--'}%
                </td>
                <td className="py-2 px-4 text-white">${crypto.market_cap?.toLocaleString() ?? '--'}</td>
                <td className="py-2 px-4 text-white">${crypto.total_volume?.toLocaleString() ?? '--'}</td>
                <td className="py-2 px-4 text-white">{crypto.circulating_supply?.toLocaleString() ?? '--'}</td>
                <td className="py-2 px-4 text-white">{crypto.max_supply?.toLocaleString() ?? '--'}</td>
                <td className="py-2 px-4">
                  {/* 7D Chart Mini SVG or Sparkline */}
                  <svg width="60" height="24">
                    <polyline
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      points={crypto.sparkline_in_7d?.price?.map((p, i, arr) => `${(i / (arr.length - 1)) * 60},${24 - ((p - Math.min(...arr)) / (Math.max(...arr) - Math.min(...arr) || 1)) * 20}`).join(' ')}
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CryptoTable; 