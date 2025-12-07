import './SearchBar.css'

import { useContext, useEffect, useRef, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import './SearchBar.css'

function SearchBar({ onSelectCoin }) {
  const { allCoins, setSearchTerm } = useContext(CoinContext)
  const [query, setQuery] = useState('')
  const [displayCoins, setDisplayCoins] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInput = (e) => {
    const value = e.target.value
    setQuery(value)
    setSearchTerm(value)
    if (value.length > 0) {
      const filtered = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(value.toLowerCase())
      )
      setDisplayCoins(filtered)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleSelect = (id) => {
    if (onSelectCoin) {
      onSelectCoin(id)
    }
    setQuery('')
    setSearchTerm('')
    setShowDropdown(false)
  }

  return (
    <section className="search-bar" id="home">
      <div className="search-bar__glow" aria-hidden="true" />
      <h1>The Coin List</h1>
      <p className="search-bar__subtitle">
        Welcome to your gateway to crypto price action. Start exploring the future of finance with us.
      </p>

      <div className="search-bar__control" ref={searchRef}>
        <input
          type="text"
          placeholder="Search crypto..."
          aria-label="Search crypto"
          value={query}
          onChange={handleInput}
          onFocus={() => { if (query.length > 0) setShowDropdown(true) }}
        />
        <button>Search</button>

        {showDropdown && displayCoins.length > 0 && (
          <ul className="search-results">
            {displayCoins.slice(0, 10).map((coin) => (
              <li key={coin.id} className="search-item" onClick={() => handleSelect(coin.id)}>
                <img src={coin.image} alt={coin.name} />
                <span>{coin.name}</span>
                <span className="symbol">{coin.symbol.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default SearchBar

