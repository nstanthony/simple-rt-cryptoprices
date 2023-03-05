import { useEffect, useState } from "react";
import axios from "axios";

type CoinData = {
  symbol: string;
  price: string;
  volume: string;
  priceChange: string;
};

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CoinData[]>([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const symbols = ["BTCUSDT", "ETHUSDT", "LTCUSDT", "XMRUSDT", "XRPUSDT", "DOGEUSDT", "DASHUSDT"];
      const response = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr`
      );
      const data = response.data.filter((coindata:any)=>symbols.includes(coindata.symbol)).map((coin: any) => ({
        symbol: coin.symbol,
        price: coin.lastPrice,
        volume: coin.quoteVolume,
        priceChange: coin.priceChange,
      }));
      setCryptoData(data);
    };
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 2000); // Refresh the prices every 2 seconds
    return () => clearInterval(interval);
  }, []);

  if (cryptoData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {cryptoData.map((coin) => (
        <div key={coin.symbol}>
          <h2>{coin.symbol.replace("USDT", "")} Price: {coin.price} USD</h2>
          <p>Volume (24h): {coin.volume}</p>
          <p>Price Change (24h): {coin.priceChange}</p>
        </div>
      ))}
    </div>
  );
};

export default CryptoData;
