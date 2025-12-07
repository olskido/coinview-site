import { createContext, useEffect, useState } from 'react'

export const CoinContext = createContext()

const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [currency, setCurrency] = useState({ name: 'usd', symbol: '$' })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let isActive = true

    const fetchAllCoins = async () => {
      try {
        if (isActive) {
          setLoading(true)
        }
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
        )
        const data = await response.json()
        if (isActive) {
          setAllCoins(data)
        }
      } catch (error) {
        console.error('Failed to fetch coins', error)
        if (isActive) {
          setAllCoins([])
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    fetchAllCoins()

    const interval = setInterval(fetchAllCoins, 120000)

    return () => {
      isActive = false
      clearInterval(interval)
    }
  }, [currency])

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    loading,
    searchTerm,
    setSearchTerm,
  }

  return <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
}

export default CoinContextProvider

