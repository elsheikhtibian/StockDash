import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function Markets() {
    const [activeButton, setActiveButton] = useState(0); // Default to "US"
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);

    const regions = ["US", "Europe", "Asia", "Currencies", "Crypto", "Futures"];
    const fakeStocks = [
        { symbol: "AAPL", name: "Apple", data: [170, 172, 175, 178, 180], change: 1.5 },
        { symbol: "MSFT", name: "Microsoft", data: [320, 322, 330, 335, 340], change: 3.2 },
        { symbol: "GOOGL", name: "Alphabet", data: [140, 142, 145, 150, 155], change: 2.5 },
        { symbol: "AMZN", name: "Amazon", data: [300, 310, 320, 325, 330], change: 2.8 },
        { symbol: "META", name: "Meta", data: [210, 212, 215, 217, 220], change: 1.9 },
    ];

    const fakeData = {
        US: {
            labels: ["AAPL", "MSFT", "GOOGL", "AMZN", "META"],
            datasets: [
                {
                    label: "Stock Prices ($)",
                    data: [175, 330, 145, 320, 215],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
            ],
        },
        // Other regions omitted for brevity
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            const results = fakeStocks.filter((stock) =>
                stock.symbol.toLowerCase().includes(e.target.value.toLowerCase()) ||
                stock.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleStockSelect = (stock) => {
        setSelectedStock(stock);
        setSearchTerm("");
        setSearchResults([]);
    };

    const activeRegion = regions[activeButton];

    return (
        <div className="markets">
            <div>
                <div className="market-container">
                    <h3>Compare Markets</h3>
                    {regions.map((region, index) => (
                        <button
                            key={index}
                            className={`market-button ${activeButton === index ? "active" : ""}`}
                            onClick={() => {
                                setActiveButton(index);
                                setSelectedStock(null); // Reset selected stock
                            }}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* Search Feature */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for a stock..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="search-results">
                        {searchResults.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="search-result"
                                onClick={() => handleStockSelect(stock)}
                            >
                                {stock.symbol} - {stock.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart Display */}
                <div className="market-content">
                    {selectedStock ? (
                        <>
                            <h4>{selectedStock.name} ({selectedStock.symbol})</h4>
                            <Line
                                data={{
                                    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
                                    datasets: [
                                        {
                                            label: `${selectedStock.name} Price ($)`,
                                            data: selectedStock.data,
                                            borderColor: "rgba(255, 99, 132, 1)",
                                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                                        },
                                    ],
                                }}
                            />
                            <p>
                                <strong>Percentage Change Today:</strong> {selectedStock.change}%
                            </p>
                        </>
                    ) : (
                        <>
                            <h4>{activeRegion} Market Data</h4>
                            <Line data={fakeData[activeRegion]} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
