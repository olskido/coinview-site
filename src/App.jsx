import { useContext, useMemo, useState, useEffect } from 'react'
import { CoinContext } from './context/CoinContext'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import Stats from './components/Stats/Stats'
import Trending from './components/Trending/Trending'
import CryptoTable from './components/CryptoTable/CryptoTable'
import CoinDetail from './components/CoinDetail/CoinDetail'
import Footer from './components/Footer/Footer'
import './App.css'

const brandStoryTitle = 'CoinView: See the Signal, Ignore the Noise'
const brandStoryCopy =
  'CoinView is your personal command center for the digital asset world. We cut through the complexity to deliver a clean, honest view of the cryptocurrency market. Track live prices, volume-based movements, and essential statistics for all top coins—all in one place. It is not about trading; it is about clarity. We give you the data you need to monitor the market with confidence and make informed choices.'

const stats = [
  {
    label: 'Market Cap',
    value: 3075488100769,
    change: 1.6,
    chartPoints: '0,40 20,35 40,30 60,25 80,28 100,20 120,22 140,18 160,15 180,20 200,15',
  },
  {
    label: '24h Trading Volume',
    value: 160613849204,
    change: 0.8,
    chartPoints: '0,45 20,42 40,38 60,35 80,32 100,28 120,30 140,25 160,22 180,20 200,25',
  },
]

function App() {
  const { allCoins, currency, loading } = useContext(CoinContext)
  const [selectedCoinId, setSelectedCoinId] = useState(null)

  useEffect(() => {
    if (allCoins.length > 0) {
      setSelectedCoinId(allCoins[0].id)
    }
  }, [allCoins])

  const selectedCoin = useMemo(
    () => allCoins.find((coin) => coin.id === selectedCoinId),
    [allCoins, selectedCoinId],
  )

  const handleLogoClick = () => {
    const element = document.getElementById('home')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatCurrencyWithSymbol = (value, options = {}) =>
    `${currency.symbol} ${Number(value ?? 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    })}`

  const formatLargeCurrencyWithSymbol = (value) =>
    `${currency.symbol} ${Number(value ?? 0).toLocaleString('en-US')}`

  return (
    <div className="app-shell">
      <div className="page-container">
        <Header onLogoClick={handleLogoClick} />
        <main>
          <SearchBar onSelectCoin={setSelectedCoinId} />
          <Stats stats={stats} formatLargeCurrency={formatLargeCurrencyWithSymbol} />
          <Trending formatCurrency={formatCurrencyWithSymbol} />
          <section className="market-section" id="coins">
            <CryptoTable
              onSelectCoin={setSelectedCoinId}
              selectedCoinId={selectedCoinId}
            />
            <CoinDetail
              coin={selectedCoin}
              loading={loading}
              formatCurrency={formatCurrencyWithSymbol}
              formatLargeCurrency={formatLargeCurrencyWithSymbol}
            />
          </section>
        </main>
        <Footer title={brandStoryTitle} copy={brandStoryCopy} onLogoClick={handleLogoClick} />
      </div>
    </div>
  )
}

export default App
