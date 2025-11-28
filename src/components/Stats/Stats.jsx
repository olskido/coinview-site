import { useState, useEffect } from 'react';
import './Stats.css';

function Stats({ formatLargeCurrency }) {
  const [stats, setStats] = useState([
    { label: 'Total Market Cap', value: 0, change: 0, chartPoints: '0,50 50,40 100,35 150,30 200,25' },
    { label: '24h Trading Volume', value: 0, change: 0, chartPoints: '0,30 50,35 100,32 150,38 200,36' },
  ]);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await res.json();
        const g = data.data;

        setStats([
          {
            label: 'Total Market Cap',
            value: g.total_market_cap.usd,
            change: g.market_cap_change_percentage_24h_usd.toFixed(2),
            chartPoints: generateChartPoints(g.market_cap_change_percentage_24h_usd > 0),
          },
          {
            label: '24h Trading Volume',
            value: g.total_volume.usd,
            change: 0, // Volume % change not provided by global API → we keep it neutral
            chartPoints: '0,30 40,35 80,32 120,38 160,34 200,36',
          },
        ]);
      } catch (err) {
        console.log('Failed to fetch global data:', err);
      }
    };

    fetchGlobalData();
    const interval = setInterval(fetchGlobalData, 90000); // refresh every 90s
    return () => clearInterval(interval);
  }, []);

  // Simple function to generate realistic-looking chart points based on trend
  const generateChartPoints = (isUp) => {
    if (isUp) {
      return '0,50 40,45 80,38 120,35 160,30 200,25';
    } else {
      return '0,25 40,30 80,38 120,45 160,48 200,50';
    }
  };

  return (
    <section className="stats">
      <div className="stats__grid">
        {stats.map((stat) => (
          <div className="stats-card" key={stat.label}>
            <div className="stats-card__value">
              {formatLargeCurrency ? formatLargeCurrency(stat.value) : `$${stat.value.toLocaleString()}`}
            </div>
            <div className="stats-card__label">{stat.label}</div>
            <div
              className="stats-card__change"
              style={{
                color: stat.change >= 0 ? '#4caf95' : '#f44336',
              }}
            >
              {stat.change >= 0 ? 'Up' : 'Down'} {Math.abs(stat.change)}%
            </div>
            <svg className="stats-card__chart" viewBox="0 0 200 60" aria-hidden="true">
              <polyline
                points={stat.chartPoints}
                fill="none"
                stroke={stat.change >= 0 ? '#4caf95' : '#f44336'}
                strokeWidth="2.5"
                opacity="0.7"
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
