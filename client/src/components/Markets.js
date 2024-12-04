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
    const regions = ["US", "Europe", "Asia", "Currencies", "Crypto", "Futures"];
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
        Europe: {
            labels: ["SAP", "ASML", "BMW", "LVMH", "Nestlé"],
            datasets: [
                {
                    label: "Stock Prices (€)",
                    data: [120, 750, 85, 850, 112],
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                },
            ],
        },
        Asia: {
            labels: ["Toyota", "Samsung", "Tencent", "Sony", "Alibaba"],
            datasets: [
                {
                    label: "Stock Prices (¥/₩)",
                    data: [2300, 67000, 400, 12000, 100],
                    borderColor: "rgba(255, 206, 86, 1)",
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                },
            ],
        },
        Currencies: {
            labels: ["USD/EUR", "USD/JPY", "USD/GBP", "USD/CHF", "USD/CAD"],
            datasets: [
                {
                    label: "Exchange Rates",
                    data: [1.1, 150, 0.78, 0.91, 1.34],
                    borderColor: "rgba(153, 102, 255, 1)",
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                },
            ],
        },
        Crypto: {
            labels: ["BTC", "ETH", "BNB", "XRP", "DOGE"],
            datasets: [
                {
                    label: "Crypto Prices ($)",
                    data: [34000, 2100, 250, 0.6, 0.07],
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        },
        Futures: {
            labels: ["Gold", "Oil", "Silver", "Corn", "Wheat"],
            datasets: [
                {
                    label: "Futures Prices ($)",
                    data: [1900, 75, 23, 5.5, 6.3],
                    borderColor: "rgba(255, 159, 64, 1)",
                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                },
            ],
        },
    };

    const handleButtonClick = (index) => {
        setActiveButton(index);
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
                            onClick={() => handleButtonClick(index)}
                        >
                            {region}
                        </button>
                    ))}
                </div>
                <div className="market-content">
                    <h4>{activeRegion} Market Data</h4>
                    <Line data={fakeData[activeRegion]} />
                    <div className="chart-key">
                        <p>
                            <strong>Key:</strong> Each label represents a stock or asset for the {activeRegion} market.
                            Data is in placeholder units.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
