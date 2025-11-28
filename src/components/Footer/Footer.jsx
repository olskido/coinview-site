import logo from '../../assets/coinview-logo.svg'
import './Footer.css'

function Footer({ title, copy, onLogoClick }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer__content">
        <button className="footer__logo" onClick={onLogoClick} aria-label="Back to home">
          <img src={logo} alt="CoinView logo" className="footer__logo-mark" />
          <div className="footer__story">
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </button>

        <div className="footer__links">
          {/* Contract Address */}
          <a href="#" target="_blank" rel="noreferrer">
            🔗 CA: 3nayMtqvCWroZtSbioFDNM6qKbEbrvWquwLkaxK2pump
          </a>

          {/* Telegram with real icon */}
          <a href="https://t.me/deeaaddd" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 240 240"
              fill="#0088cc"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M120,0C53.73,0,0,53.73,0,120s53.73,120,120,120s120-53.73,120-120S186.27,0,120,0z
              M179.74,79.13l-26.2,123.52c-1.97,8.72-7.16,10.88-14.51,6.78l-40.11-29.58l-19.36,18.64c-2.13,2.13-3.91,3.91-8.03,3.91
              l2.86-40.59l73.92-66.7c3.21-2.86-0.7-4.46-4.99-1.6l-91.4,57.44l-39.47-12.34c-8.6-2.7-8.72-8.6,1.86-12.74L170.98,66.51
              C177.72,64,183.36,68.28,179.74,79.13z" />
            </svg>
            Telegram
          </a>

          {/* Twitter */}
          <a href="https://x.com/olskiddo" target="_blank" rel="noreferrer">
            𝕏 Twitter
          </a>

          {/* GitHub */}
          <a href="https://github.com/olskido" target="_blank" rel="noreferrer">
            💻 GitHub
          </a>
        </div>
      </div>

      <div className="footer__info">© 2025 CoinView. Your gateway to crypto clarity.</div>
    </footer>
  )
}

export default Footer
