
import { useContext, useEffect, useMemo, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import './CryptoTable.css'

function CryptoTable({ onSelectCoin, selectedCoinId }) {
  const { allCoins, loading, currency, searchTerm } = useContext(CoinContext)
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10
  const maxPagesToShow = 10


  useEffect(() => {
    // This useEffect was responsible for setting up the search input listener
    // and updating the local searchTerm state.
    // Since searchTerm is now managed by CoinContext, this useEffect is no longer needed here.
    setCurrentPage(1)
  }, [currency.name, searchTerm])

  const filteredCoins = useMemo(() => {
    if (!searchTerm) return allCoins
    return allCoins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    )
  }, [allCoins, searchTerm])

  const paginatedCoins = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredCoins.slice(start, start + pageSize)
  }, [filteredCoins, currentPage])

  const totalPages = Math.ceil(filteredCoins.length / pageSize)
  const pageButtons = Array.from(
    { length: Math.min(maxPagesToShow, totalPages || 1) },
    (_, i) => i + 1
  )

  const formatPrice = (value, options = {}) =>
    `${currency.symbol}${Number(value ?? 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    })
    } `

  const handleSelect = (coin) => onSelectCoin?.(coin.id)

  if (loading) return <div className="crypto-table"><p className="loading-message">Loading real-time market data...</p></div>
  if (!paginatedCoins.length) return <div className="crypto-table"><p className="loading-message">No coins found</p></div>

  return (
    <div className="crypto-table">
      <div className="crypto-table__wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coins</th>
              <th>Price</th>
              <th>24H Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCoins.map((coin) => (
              <tr
                key={coin.id}
                className={coin.id === selectedCoinId ? 'selected' : ''}
                onClick={() => handleSelect(coin)}
              >
                <td>{coin.market_cap_rank}</td>
                <td>
                  <div className="coin-info">
                    <div className="coin-icon">
                      <img src={coin.image} alt={coin.name} loading="lazy" />
                    </div>
                    <div>
                      <div className="coin-name">{coin.name}</div>
                      <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="price">{formatPrice(coin.current_price)}</td>
                <td className={coin.price_change_percentage_24h >= 0 ? 'change-positive' : 'change-negative'}>
                  {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="market-cap">
                  {formatPrice(coin.market_cap, { minimumFractionDigits: 0 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {pageButtons.map((pageNum) => (
          <button
            key={pageNum}
            className={`page - btn ${currentPage === pageNum ? 'active' : ''} `}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CryptoTable