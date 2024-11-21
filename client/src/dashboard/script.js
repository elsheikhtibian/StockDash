// Proxy and API URLs
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // Use only for testing CORS
const API_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";

// List of stock symbols to track
const stockSymbols = ["AAPL", "TSLA", "GOOG", "AMZN", "MSFT"];

// Fetch the top gainer among the stocks
async function fetchTopGainer() {
  let topGainer = null;
  let maxGain = -Infinity;

  for (const symbol of stockSymbols) {
    try {
      // Fetch stock data
      const response = await fetch(`${PROXY_URL}${API_URL}${symbol}?interval=1d&range=1d`);
      const data = await response.json();

      // Validate API response
      if (data.chart && data.chart.result && data.chart.result[0]) {
        const result = data.chart.result[0];
        const openPrice = result.indicators.quote[0].open[0];
        const closePrice = result.indicators.quote[0].close[0];

        // Skip if data is incomplete
        if (!openPrice || !closePrice) continue;

        // Calculate the percentage gain
        const gain = ((closePrice - openPrice) / openPrice) * 100;

        // Check if this is the top gainer
        if (gain > maxGain) {
          maxGain = gain;
          topGainer = {
            symbol,
            gain: gain.toFixed(2),
            closePrice: closePrice.toFixed(2),
          };
        }
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
    }
  }

  return topGainer;
}

// Update the HTML dynamically
async function updateTopGainer() {
  const topGainer = await fetchTopGainer();

  const categoryElement = document.querySelector(".card-category");
  const titleElement = document.querySelector(".card-title");

  if (topGainer) {
    categoryElement.textContent = "Top Gainer";
    titleElement.textContent = `${topGainer.symbol}: ${topGainer.gain}% ($${topGainer.closePrice})`;
  } else {
    categoryElement.textContent = "Top Gainer";
    titleElement.textContent = "No data available";
  }
}

// Initialize the update
updateTopGainer();
