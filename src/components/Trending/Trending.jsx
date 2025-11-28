// Trending.jsx — CoinGecko Trending + CoinPaprika Top Gainers
import { useState, useEffect } from 'react'
import './Trending.css'

export default function Trending({ formatCurrency, onSelectCoin }) {
  const [trending, setTrending] = useState([])
  const [gainers, setGainers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Trending from CoinGecko
        const trendRes = await fetch('https://api.coingecko.com/api/v3/search/trending')
        const trendData = await trendRes.json()
        setTrending(trendData.coins.slice(0, 3))

        // Top Gainers from CoinPaprika
        const gainRes = await fetch('https://api.coinpaprika.com/v1/tickers')
        const gainData = await gainRes.json()

        // Filter coins that have percent changes + real prices
        const cleaned = gainData.filter(c => 
          c.quotes?.USD?.percent_change_24h !== undefined &&
          c.quotes?.USD?.price !== undefined
        )

        // Sort top gainers by 24h change
        const top = cleaned
          .sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h)
          .slice(0, 3)

        setGainers(top)

      } catch (err) {
        console.error('API fetch error:', err)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000)
    return () => clearInterval(interval)
  }, [])

  const fmt = formatCurrency || ((price) => {
    if (!price) return '$0.00'
    return price < 1 ? `$${price.toFixed(4)}` : `$${price.toFixed(2)}`
  })

  const handleClick = (id) => onSelectCoin?.(id)

  const renderItem = (coin, fromGainers = false) => {
    let c
    let price
    let change24h
    let image
    let symbol
    let name
    let id

    const isTrendingItem = 'item' in coin

    if (isTrendingItem) {
      // Trending (CoinGecko)
      c = coin.item
      id = c.id
      name = c.name
      symbol = c.symbol
      image = c.thumb
      price = c.data.price
      change24h = c.data.price_change_percentage_24h.usd
    } else {
      // Gainers (CoinPaprika)
      c = coin
      id = c.id
      name = c.name
      symbol = c.symbol
      image = `https://static.coinpaprika.com/coin/${c.id}/logo.png`
      price = c.quotes.USD.price
      change24h = c.quotes.USD.percent_change_24h
    }

    return (
      <div
        key={id}
        className="trend-item"
        onClick={() => handleClick(id)}
      >
        <div className="trend-item__avatar">
          <img
            src={image}
            alt={name}
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>

        <div>
          <div className="trend-item__name">{name}</div>
          <div className="trend-item__symbol">{symbol?.toUpperCase()}</div>
        </div>

        <div className="trend-item__price">{fmt(price)}</div>

        <div className={`trend-item__change ${change24h >= 0 ? 'positive' : 'negative'}`}>
          {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
        </div>
      </div>
    )
  }

  return (
    <section className="trend-section">
      <div className="trend-card">
        <div className="trend-card__header">
          <span>Trending</span>
        </div>
        {trending.map(coin => renderItem(coin))}
      </div>

      <div className="trend-card">
        <div className="trend-card__header">
          <span>Top Gainers</span>
        </div>
        {gainers.map(coin => renderItem(coin))}
      </div>
    </section>
  )
}
