import NewsLink from './NewsLink';

export default function Markets(){
    return <markets classname="markets">
        <div>
            <h2>compare markets</h2>
            <ul>
                <li>US</li>
                <li>Europe</li>
                <li>Asia</li>
                <li>Currencies</li>
                <li>Crypto</li>
                <li>Futures</li>
            </ul>
            <NewsLink 
                url="https://www.investors.com/market-trend/stock-market-today/dow-jones-sp500-nasdaq-trump-nvidia-stock-nvda/"
                articleTitle = "Dow Jones Falls On Trump Tariff Threat; Nvidia Stock Hangs At Key Level"
                website = "Investor's Business Daily"
            />
        </div>
    </markets>
}