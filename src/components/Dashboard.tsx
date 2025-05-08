import React from 'react';
import BTCChartWidget from './BTCChartWidget';
import RightWidgets from './RightWidgets';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Chart Area */}
      <div className="xl:col-span-2 flex flex-col gap-8">
        {/* BTC/USD Chart Widget */}
        <BTCChartWidget />
        {/* Bottom Widgets: Rewards & Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rewards Widget */}
          <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Rewards</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked readOnly className="accent-blue-500" />
                <span className="text-white">Invite a friend using your referral code <span className="text-blue-400">+10.00 USDT</span></span>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked readOnly className="accent-blue-500" />
                <span className="text-white">Get your first coin <span className="text-gray-400">50% bonus to your next deposit</span></span>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-blue-500" />
                <span className="text-white">Get your first coin <span className="text-gray-400">50% bonus to your next deposit</span></span>
              </div>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">Get a reward</button>
            </div>
          </section>
          {/* Transactions Widget */}
          <section className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Transactions</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-white"><span>Ethereum</span><span className="text-green-400">+5.00 ETH</span></div>
              <div className="flex justify-between text-white"><span>Monero</span><span className="text-green-400">+0.90 XMR</span></div>
              <div className="flex justify-between text-white"><span>Tether</span><span className="text-green-400">+2500.00 USDT</span></div>
              <div className="flex justify-between text-white"><span>Solana</span><span className="text-red-400">-2.70 SOL</span></div>
            </div>
            <div className="text-right mt-2">
              <button className="text-blue-400 hover:underline">See more</button>
            </div>
          </section>
        </div>
      </div>
      {/* Right Side Widgets */}
      <RightWidgets />
    </div>
  );
};

export default Dashboard; 