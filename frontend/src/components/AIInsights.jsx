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

  useEffect(() => {
    const fetchAll = async () => {
      try {
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
      } catch (err) {
        console.error("AI Insights fetch error:", err);
      }
    };
    fetchAll();
  }, [refreshKey ?? 0]);

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

      {!health && !burn && (
        <div className="list-empty" style={{ padding: 24 }}>
          Loading insights…
        </div>
      )}
    </div>
  );
}
