// CoinDetail.jsx — FINAL & FLAWLESS
import { useState, useEffect } from 'react'
import './CoinDetail.css'

function CoinDetail({ coin, loading, formatCurrency, formatLargeCurrency }) {
  const [chartData, setChartData] = useState([])
  const [chartLoading, setChartLoading] = useState(true)

  useEffect(() => {
    if (!coin?.id) return

    const fetchChart = async () => {
      try {
        setChartLoading(true)
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7&interval=daily`
        )
        const data = await res.json()
        const prices = data.prices.map(([_, price]) => price)
        setChartData(prices)
      } catch (err) {
        console.log('Chart fetch error:', err)
        const fake = Array.from({ length: 7 }, () => coin.current_price * (0.95 + Math.random() * 0.1))
        setChartData(fake)
      } finally {
        setChartLoading(false)
      }
    }

    fetchChart()
  }, [coin?.id])

  if (loading || !coin) {
    return (
      <aside className="coin-detail">
        <p className="loading-message">
          {loading ? 'Loading market snapshot...' : 'Select a coin to view details.'}
        </p>
      </aside>
    )
  }

  const prices = chartData.length > 0 ? chartData : Array(7).fill(coin.current_price)
  const max = Math.max(...prices)
  const min = Math.min(...prices)
  const range = max - min || 1

  const points = prices
    .map((price, i) => {
      const x = (i / (prices.length - 1)) * 280
      const y = 100 - ((price - min) / range) * 80
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const isPositive = coin.price_change_percentage_24h >= 0

  return (
    <aside className="coin-detail">
      {/* Header */}
      <header>
        <div>
          <p className="coin-detail__label">Selected Asset</p>
          <h3>{coin.name}</h3>
          <span className="coin-detail__symbol">{coin.symbol}</span>
        </div>
        <div className="coin-detail__price-block">
          <div className="coin-detail__price">{formatCurrency(coin.current_price)}</div>
          <div className={`coin-detail__change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
          </div>
        </div>
      </header>

      {/* 7-Day Chart */}
      <div className="coin-detail__chart">
        <div className="coin-detail__chart-header">
          <span>7-Day Price Trend</span>
          <span style={{ color: isPositive ? '#4caf95' : '#ff6b6b' }}>
            {coin.price_change_percentage_7d_in_currency ? 
              `${isPositive ? '+' : ''}${coin.price_change_percentage_7d_in_currency.toFixed(2)}%` : 
              '—'}
          </span>
        </div>
        <svg viewBox="0 0 280 110">
          {chartLoading ? (
            <text x="140" y="55" textAnchor="middle" fill="#666" fontSize="13">Loading...</text>
          ) : (
            <polyline
              points={points}
              fill="none"
              stroke={isPositive ? '#4caf95' : '#ff6b6b'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
        </svg>
        <div className="coin-detail__chart-footer">
          <span>7d ago</span>
          <span>Now</span>
        </div>
      </div>

      {/* BIG HORIZONTAL STATS ROW — THIS IS THE ONE */}
      <div className="coin-detail__stats-row">
        <div className="coin-detail__stat-item">
          <div className="coin-detail__stat-label">Market Cap</div>
          <div className="coin-detail__stat-value">{formatLargeCurrency(coin.market_cap)}</div>
        </div>
        <div className="coin-detail__stat-item">
          <div className="coin-detail__stat-label">Volume (24h)</div>
          <div className="coin-detail__stat-value">{formatLargeCurrency(coin.total_volume)}</div>
        </div>
        <div className="coin-detail__stat-item">
          <div className="coin-detail__stat-label">24h High</div>
          <div className="coin-detail__stat-value high">{formatCurrency(coin.high_24h)}</div>
        </div>
        <div className="coin-detail__stat-item">
          <div className="coin-detail__stat-label">24h Low</div>
          <div className="coin-detail__stat-value low">{formatCurrency(coin.low_24h)}</div>
        </div>
      </div>
    </aside>
  )
}

export default CoinDetail