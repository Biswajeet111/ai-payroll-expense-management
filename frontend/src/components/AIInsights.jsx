import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function getHealthClass(status) {
  if (status === "Healthy") return "healthy";
  if (status === "Moderate") return "moderate";
  return "risky";
}

export default function AIInsights({ refreshKey }) {
  const [health, setHealth] = useState(null);
  const [burn, setBurn] = useState(null);
  const [anomalies, setAnomalies] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (!BASE_URL) {
          setError("API URL is not configured (VITE_API_URL is missing).");
          setLoaded(true);
          return;
        }

        const [healthRes, burnRes, anomaliesRes, predictionRes] = await Promise.all([
          axios.get(`${BASE_URL}/financial-health/`),
          axios.get(`${BASE_URL}/burn-rate-alert/`),
          axios.get(`${BASE_URL}/expense-anomalies/`),
          axios.get(`${BASE_URL}/cashflow-prediction/`),
        ]);
        setHealth(healthRes.data);
        setBurn(burnRes.data);
        setAnomalies(anomaliesRes.data);
        setPrediction(predictionRes.data);
        setError(null);
        setLoaded(true);
      } catch (err) {
        console.error("AI Insights fetch error:", err);
        setError("Unable to load insights. Please check that the API is running and reachable.");
        setLoaded(true);
      }
    };
    fetchAll();
  }, [refreshKey ?? 0]);

  return (
    <div className="insights-panel">
      {error && (
        <div className="insight-block risky">
          <div className="insight-label">Insights unavailable</div>
          <div className="insight-status">{error}</div>
        </div>
      )}

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

      {prediction && (
        <div className="insight-block">
          <div className="insight-label">Cashflow prediction</div>
          <div className="insight-value">
            ₹ {Number(prediction.predicted_next_month_balance ?? 0).toLocaleString()}
          </div>
          <div className="insight-status">Predicted next month balance</div>
        </div>
      )}

      {anomalies?.anomalies?.length > 0 && (
        <div className="insight-block insight-block-anomaly">
          <div className="insight-label">Unusual expenses</div>
          <ul className="anomaly-list">
            {anomalies.anomalies.map((item, i) => (
              <li key={i}>
                {item.title} – ₹ {item.amount?.toLocaleString() ?? item.amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loaded && !error && (
        <div className="list-empty" style={{ padding: 24 }}>
          Loading insights…
        </div>
      )}

      {loaded &&
        !error &&
        !health &&
        !burn &&
        !prediction &&
        !(anomalies?.anomalies?.length > 0) && (
          <div className="list-empty" style={{ padding: 24 }}>
            No insights available yet. Try adding employees and expenses.
          </div>
        )}
    </div>
  );
}
