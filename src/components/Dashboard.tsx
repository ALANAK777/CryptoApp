import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import BTCChartWidget from './BTCChartWidget';
import RightWidgets from './RightWidgets';
import CryptoTable from './CryptoTable';
import { setCryptoList, setLoading, setError } from '../store/cryptoSlice';
import { sampleCryptoData } from '../sampleCryptoData';

const COINMARKETCAP_API_KEY = 'cde866e0-6ee5-46f6-83ae-4080014f0299';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [useSample, setUseSample] = useState(false); // Default to live data

  const loadSample = useCallback(() => {
    dispatch(setCryptoList(sampleCryptoData));
  }, [dispatch]);

  const loadLive = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10',
        {
          headers: {
            'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
          },
        }
      );
      const data = await response.json();
      // Map CoinMarketCap data to your CryptoData structure
      const mapped = data.data.map((coin: any) => ({
        id: coin.id.toString(),
        name: coin.name,
        symbol: coin.symbol,
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
        current_price: coin.quote.USD.price,
        market_cap: coin.quote.USD.market_cap,
        total_volume: coin.quote.USD.volume_24h,
        price_change_percentage_1h_in_currency: coin.quote.USD.percent_change_1h,
        price_change_percentage_24h: coin.quote.USD.percent_change_24h,
        price_change_percentage_7d_in_currency: coin.quote.USD.percent_change_7d,
        circulating_supply: coin.circulating_supply,
        max_supply: coin.max_supply,
        sparkline_in_7d: { price: Array(7).fill(coin.quote.USD.price) }, // Placeholder sparkline
      }));
      dispatch(setCryptoList(mapped));
    } catch (err) {
      dispatch(setError('Failed to fetch crypto data'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (useSample) {
      loadSample();
    } else {
      loadLive();
    }
  }, [useSample, loadSample, loadLive]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Toggle Button */}
      <div className="col-span-full flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold mr-2 ${useSample ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
          onClick={() => setUseSample(true)}
        >
          Sample Data
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${!useSample ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
          onClick={() => setUseSample(false)}
        >
          Live Data
        </button>
      </div>
      {/* Main Chart Area */}
      <div className="xl:col-span-2 flex flex-col gap-8">
        <BTCChartWidget />
        <CryptoTable />
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
      <RightWidgets />
    </div>
  );
};

export default Dashboard; 