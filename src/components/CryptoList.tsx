import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setCryptoList, setLoading, setError, setSelectedCrypto } from '../store/cryptoSlice';

const CryptoList = () => {
  const dispatch = useDispatch();
  const { cryptoList, loading, error } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    const fetchCryptoData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
        );
        const data = await response.json();
        dispatch(setCryptoList(data));
      } catch (err) {
        dispatch(setError('Failed to fetch crypto data'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">24h Change</th>
              <th className="py-2 px-4">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {cryptoList.map((crypto) => (
              <tr
                key={crypto.id}
                className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
                onClick={() => dispatch(setSelectedCrypto(crypto))}
              >
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <span className="font-medium">{crypto.name}</span>
                    <span className="text-gray-400 ml-2">{crypto.symbol.toUpperCase()}</span>
                  </div>
                </td>
                <td className="py-2 px-4">${crypto.current_price.toLocaleString()}</td>
                <td className={`py-2 px-4 ${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="py-2 px-4">${crypto.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList; 