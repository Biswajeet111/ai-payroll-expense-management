import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AIInsights() {
  const [health, setHealth] = useState(null);
  const [burn, setBurn] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/financial-health/`)
      .then(res => setHealth(res.data))
      .catch(err => console.error(err));

    axios.get(`${BASE_URL}/burn-rate-alert/`)
      .then(res => setBurn(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {health && (
        <>
          <h4>Financial Health: {health.financial_health_score}%</h4>
          <p>Status: {health.status}</p>
        </>
      )}

      {burn && (
        <>
          <h4>Burn Rate: {burn.burn_rate_percentage}%</h4>
          <p>{burn.alert}</p>
        </>
      )}
    </div>
  );
}
