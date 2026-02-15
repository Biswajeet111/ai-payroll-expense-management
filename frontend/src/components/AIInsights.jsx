import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function getHealthClass(status) {
  if (status === "Healthy") return "healthy";
  if (status === "Moderate") return "moderate";
  return "risky";
}

export default function AIInsights() {
  const [health, setHealth] = useState(null);
  const [burn, setBurn] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/financial-health/`).then((res) => setHealth(res.data));
    axios.get(`${BASE_URL}/burn-rate-alert/`).then((res) => setBurn(res.data));
  }, []);

  return (
    <div className="insights-panel">
      {health && (
        <div className={`insight-block ${getHealthClass(health.status)}`}>
          <div className="insight-label">Financial health score</div>
          <div className="insight-value">{health.financial_health_score}%</div>
          <div className="insight-status">{health.status}</div>
        </div>
      )}

      {burn && (
        <div className="insight-block">
          <div className="insight-label">Burn rate</div>
          <div className="insight-value">{burn.burn_rate_percentage}%</div>
          <div className="insight-status">{burn.alert}</div>
        </div>
      )}

      {!health && !burn && (
        <div className="list-empty" style={{ padding: 24 }}>
          Loading insights…
        </div>
      )}
    </div>
  );
}
