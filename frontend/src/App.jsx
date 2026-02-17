import { useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    if (!API_URL) return;
    axios.get(`${API_URL}/`).catch(() => {});
  }, []);

  return <Dashboard />;
}

export default App;
