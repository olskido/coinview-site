import './SearchBar.css'

function SearchBar() {
  return (
    <section className="search-bar" id="home">
      <div className="search-bar__glow" aria-hidden="true" />
      <h1>The Coin List</h1>
      <p className="search-bar__subtitle">
        Welcome to your gateway to crypto price action. Start exploring the future of finance with us.
      </p>

      <div className="search-bar__control">
        <input type="text" placeholder="Search crypto..." aria-label="Search crypto" />
        <button>Search</button>
      </div>
    </section>
  )
}

export default SearchBar

