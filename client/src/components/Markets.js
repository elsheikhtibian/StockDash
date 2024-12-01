import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import NewsLink from './NewsLink';

export default function Markets() {
    const [activeButton, setActiveButton] = useState(null); // State to track the active button
    const [marketData, setMarketData] = useState(null); // Store market data
    const [error, setError] = useState(null); // Handle API errors

    // Alpha Vantage API configuration
    // ALPHA VANTAGE API KEY : VBGHGBHXXT1R3Q6G
    const symbols = useMemo(() => ["DJI", "SPX", "IXIC", "RUT", "VIX"], []); // Market symbols
    const apiKey = "VBGHGBHXXT1R3Q6G"; // Replace with your API key
    const baseUrl = "https://www.alphavantage.co/query";

    // Fetch data function
    const fetchMarketData = useCallback(async () => {
        try {
            const promises = symbols.map((symbol) =>
                axios.get(baseUrl, {
                    params: {
                        function: "TIME_SERIES_DAILY",
                        symbol,
                        apikey: apiKey,
                    },
                })
            );
            const responses = await Promise.all(promises);

            // Log the response to see the structure
            responses.forEach((response, index) => {
                console.log(`Data for ${symbols[index]}:`, response.data);
            });

            // Extract relevant data if it exists
            const data = responses.map((response) => response.data);
            setMarketData(data);
            setError(null); // Clear previous errors
        } catch (err) {
            setError("Failed to fetch market data. Please try again later.");
            console.error(err);
        }
    }, [symbols, baseUrl, apiKey]);

    useEffect(() => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight.getTime() - now.getTime();

        const timeout = setTimeout(() => {
            fetchMarketData();
            const interval = setInterval(fetchMarketData, 86400000); // Fetch every 24 hours
            return () => clearInterval(interval);
        }, timeUntilMidnight);

        return () => clearTimeout(timeout);
    }, [fetchMarketData]);

    const handleButtonClick = (index) => {
        setActiveButton(index); // Set the clicked button as active
    };

    return <markets className="markets">
        <div>
            <div className="market-container">
                <h3>compare markets</h3>
                <button key={0} className={activeButton === 0 ? "market-button active" : "market-button"} onClick={() => handleButtonClick(0)}>US</button>
                <button key={1} className={activeButton === 1 ? "market-button active" : "market-button"} onClick={() => handleButtonClick(1)}>Europe</button>
                <button key={2} className={activeButton === 2 ? "market-button active" : "market-button"} onClick={() => handleButtonClick(2)}>Asia</button>
                <button key={3} className={activeButton === 3 ? "market-button active" : "market-button"} onClick={() => handleButtonClick(3)}>Currencies</button>
                <button key={4} className={activeButton === 4 ? "market-button active" : "market-button"} onClick={() => handleButtonClick(4)}>Crypto</button>
                <button key={5} className={activeButton === 5 ? "market-button active" : "market-button"} onClick={() => handleButtonClick(5)}>Futures</button>
                <h3>|</h3>
                <NewsLink
                    url="https://www.barrons.com/articles/stock-market-returns-rally-69c9852d"
                    articleTitle="The S&P 500 Is Set for Back-to-Back 20% Gains. What History Says Happens Next."
                    website="Barron's"
                />
            </div>
            <div className="market-content">
                {activeButton === 0 && marketData ? (
                    <div>
                        <ul>
                            {symbols.map((symbol, i) => (
                                <li key={symbol}>
                                    {symbol}:{" "}
                                    {marketData[i]?.["Time Series (Daily)"]
                                        ? Object.entries(marketData[i]["Time Series (Daily)"])[0][1]["4. close"]
                                        : "No data available"}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : activeButton === 0 && error ? (
                    <p>{error}</p>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    </markets >
}