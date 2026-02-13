import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ExpenseChart() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get(`${BASE_URL}/expenses/`)
      .then(res => {
        const formatted = res.data.map(exp => ({
          name: exp.title,
          amount: exp.amount
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
