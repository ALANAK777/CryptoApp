import { store } from '../store/store';
import { setCryptoList } from '../store/cryptoSlice';

function getRandomFactor() {
  return 1 + (Math.random() - 0.5) * 0.01; // ±0.5%
}

export function startCryptoSimulation() {
  let interval: NodeJS.Timeout | null = null;

  function updatePrices() {
    const state = store.getState();
    const updated = state.crypto.cryptoList.map((coin) => {
      // Simulate price
      const newPrice = coin.current_price * getRandomFactor();
      // Simulate % changes
      const price1h = coin.price_change_percentage_1h_in_currency ?? 0;
      const price24h = coin.price_change_percentage_24h ?? 0;
      const price7d = coin.price_change_percentage_7d_in_currency ?? 0;
      // Simulate volume
      const newVolume = coin.total_volume * getRandomFactor();
      // Simulate market cap
      const newMarketCap = newPrice * (coin.circulating_supply ?? 1);
      // Simulate sparkline
      const newSpark = [...coin.sparkline_in_7d.price.slice(1), newPrice];
      return {
        ...coin,
        current_price: newPrice,
        price_change_percentage_1h_in_currency: price1h + (Math.random() - 0.5) * 0.1,
        price_change_percentage_24h: price24h + (Math.random() - 0.5) * 0.2,
        price_change_percentage_7d_in_currency: price7d + (Math.random() - 0.5) * 0.3,
        total_volume: newVolume,
        market_cap: newMarketCap,
        sparkline_in_7d: { price: newSpark },
      };
    });
    store.dispatch(setCryptoList(updated));
  }

  if (!interval) {
    interval = setInterval(updatePrices, 1500); // 1.5 seconds
  }

  return () => {
    if (interval) clearInterval(interval);
  };
} 