import React, { useState } from "react";
import NewsLink from './NewsLink';

export default function Markets() {
    const [activeButton, setActiveButton] = useState(null); // State to track the active button

    const handleButtonClick = (index) => {
        setActiveButton(index); // Set the clicked button as active
    };
    const content = [
        "US Markets",
        "Europe Markets",
        "Asian Markets",
        "Currencies",
        "Crypto Markets",
        "Futures",
    ];
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
            <div className="content">
                {activeButton !== null && <p>{content[activeButton]}</p>}
            </div>
        </div>
    </markets>
}