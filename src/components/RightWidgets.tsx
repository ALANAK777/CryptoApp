import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const RightWidgets: React.FC = () => {
  const cryptoList = useSelector((state: RootState) => state.crypto.cryptoList);
  const btc = cryptoList[0];
  const [sellAmount, setSellAmount] = useState(1);
  const [sellCoin, setSellCoin] = useState<'BTC' | 'USDT'>('BTC');

  // Total balance: sum of all market caps
  const totalBalance = cryptoList.reduce((sum, c) => sum + (c.market_cap || 0), 0);
  // 24h change: use BTC's 24h %
  const change = btc?.price_change_percentage_24h || 0;

  // Exchange calculation
  const btcPrice = btc?.current_price || 0;
  const exchangeValue = sellCoin === 'BTC' ? sellAmount * btcPrice : sellAmount / btcPrice;

  return (
    <div className="flex flex-col gap-8">
      {/* Total Balance Widget */}
      <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-2">Total balance</h3>
        <div className="text-3xl font-bold text-white mb-2">
          ${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          <span className={`text-base ml-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '▲' : '▼'} {change.toFixed(2)}%
          </span>
        </div>
        <div className="text-gray-400 mb-2">Exchange <span className="text-white">1 BTC = ${btcPrice.toLocaleString()}</span></div>
      </section>
      {/* Exchange Widget */}
      <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-2">Exchange</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white">You sell</span>
          <input
            type="number"
            min={0}
            value={sellAmount}
            onChange={e => setSellAmount(Number(e.target.value))}
            className="w-20 bg-gray-700 text-white rounded px-2 py-1 mx-2"
          />
          <select
            value={sellCoin}
            onChange={e => setSellCoin(e.target.value as 'BTC' | 'USDT')}
            className="bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="BTC">BTC</option>
            <option value="USDT">USDT</option>
          </select>
          <span className="text-white">→</span>
          <span className="bg-gray-700 px-2 py-1 rounded text-white">
            {sellCoin === 'BTC' ? 'USDT' : 'BTC'}
          </span>
        </div>
        <div className="mb-4 text-white">
          You get: <span className="font-bold">{exchangeValue.toLocaleString(undefined, { maximumFractionDigits: 6 })} {sellCoin === 'BTC' ? 'USDT' : 'BTC'}</span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">Exchange</button>
      </section>
      {/* AI Tips Widget */}
      <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-2">AI Tips</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Follow news and market analysis to understand what events may affect asset prices</li>
          <li>Create a trading plan that includes goals</li>
        </ul>
      </section>
      {/* Premium Plan Widget */}
      <section className="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-2">Premium Plan</h3>
        <p className="text-white mb-4">Upgrade your plan to Premium and get unlimited access</p>
        <button className="w-full bg-white text-blue-700 font-bold py-2 rounded-lg hover:bg-gray-100">Upgrade Now</button>
      </section>
    </div>
  );
};

export default RightWidgets; 