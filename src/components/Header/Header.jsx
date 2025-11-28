import { useContext } from 'react'
import logo from '../../assets/coinview-logo.svg'
import { CoinContext } from '../../context/CoinContext'
import './Header.css'

const currencyOptions = {
  USD: { name: 'usd', symbol: '$' },
  EUR: { name: 'eur', symbol: '€' },
  GBP: { name: 'gbp', symbol: '£' },
}

function Header({ onLogoClick }) {
  const { currency, setCurrency } = useContext(CoinContext)

  const handleCurrencyChange = (event) => {
    const selected = currencyOptions[event.target.value]
    if (selected) {
      setCurrency(selected)
    }
  }

  const currentValue =
    Object.keys(currencyOptions).find((key) => currencyOptions[key].name === currency.name) ?? 'USD'

  return (
    <header className="cv-header">
      <div className="cv-header__bar">
        <button className="cv-logo" onClick={onLogoClick} aria-label="Back to home">
          <img src={logo} alt="CoinView logo" className="cv-logo__mark" />
          <span className="cv-logo__name">CoinView</span>
        </button>
        <nav className="cv-header__nav" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#coins">Tokens</a>
          <a href="#contact">Contact</a>
        </nav>
        <select
          className="cv-header__currency"
          aria-label="Currency selector"
          value={currentValue}
          onChange={handleCurrencyChange}
        >
          {Object.keys(currencyOptions).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}

export default Header
