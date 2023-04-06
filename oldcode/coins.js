import { useState, useEffect } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [dollors, setDollors] = useState(0);
    const [targetCoin, setTargetCoin] = useState();
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            <div>
                {loading ? (
                    ""
                ) : (
                    <div>
                        <input
                            onChange={(event) => setDollors(event.target.value)}
                            type="number"
                            placeholder="how much dollors do you have?"
                        />
                    </div>
                )}
            </div>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <div>
                    <select
                        onChange={(event) => {
                            setTargetCoin(event.target.value);
                        }}
                    >
                        {coins.map((coin) => (
                            <option>
                                {coin.name} ({coin.symbol}): $ {coin.quotes.USD.price} USD
                            </option>
                        ))}
                    </select>
                    {/* <h4>
            You can get {targetCoin.quotes.USD.price / dollors} of{" "}
            {targetCoin.name}
          </h4> */}
                </div>
            )}
        </div>
    );
}

export default App;
