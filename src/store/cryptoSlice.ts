import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  circulating_supply?: number;
  max_supply?: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface CryptoState {
  cryptoList: CryptoData[];
  loading: boolean;
  error: string | null;
  selectedCrypto: CryptoData | null;
}

const initialState: CryptoState = {
  cryptoList: [],
  loading: false,
  error: null,
  selectedCrypto: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoList: (state, action: PayloadAction<CryptoData[]>) => {
      state.cryptoList = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedCrypto: (state, action: PayloadAction<CryptoData | null>) => {
      state.selectedCrypto = action.payload;
    },
  },
});

export const { setCryptoList, setLoading, setError, setSelectedCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer; 