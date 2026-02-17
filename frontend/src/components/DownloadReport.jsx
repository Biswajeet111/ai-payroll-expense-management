import { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function DownloadReport() {
  const [loading, setLoading] = useState(false);

  const downloadReport = async () => {
    setLoading(true);
    try {
      if (!BASE_URL) {
        alert("API URL is not configured. Please set VITE_API_URL in your frontend .env file.");
        setLoading(false);
        return;
      }

      const [summaryRes, healthRes, burnRes, expensesRes, anomaliesRes, predictionRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/dashboard-summary/`),
          axios.get(`${BASE_URL}/financial-health/`),
          axios.get(`${BASE_URL}/burn-rate-alert/`),
          axios.get(`${BASE_URL}/expenses/`),
          axios.get(`${BASE_URL}/expense-anomalies/`),
          axios.get(`${BASE_URL}/cashflow-prediction/`),
        ]);

      const summary = summaryRes.data;
      const health = healthRes.data;
      const burnAlert = burnRes.data;
      const expenses = expensesRes.data;
      const anomalies = anomaliesRes.data?.anomalies ?? [];
      const prediction = predictionRes.data;

      const burnRate =
        summary.total_payroll === 0
          ? 0
          : Math.round((summary.total_expenses / summary.total_payroll) * 100);

      const doc = new jsPDF();
      let y = 20;

      doc.setFontSize(18);
      doc.text("AI Smart Expense & Payroll Report", 20, y);

      y += 10;
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, y);

      y += 15;
      doc.text("----- Financial Summary -----", 20, y);
      y += 10;

      doc.text(`Total Payroll: ₹ ${summary.total_payroll?.toLocaleString?.() ?? summary.total_payroll}`, 20, y);
      y += 8;

      doc.text(`Total Expenses: ₹ ${summary.total_expenses?.toLocaleString?.() ?? summary.total_expenses}`, 20, y);
      y += 8;

      doc.text(`Net Balance: ₹ ${summary.net_balance?.toLocaleString?.() ?? summary.net_balance}`, 20, y);
      y += 8;

      doc.text(`Burn Rate: ${burnRate}%`, 20, y);
      y += 15;

      doc.text("----- Financial Health -----", 20, y);
      y += 10;
      doc.text(`Health Score: ${health?.financial_health_score ?? 0}%`, 20, y);
      y += 8;
      doc.text(`Status: ${health?.status ?? "—"}`, 20, y);
      y += 15;

      doc.text("----- Burn Rate Alert -----", 20, y);
      y += 10;
      doc.text(`${burnAlert?.alert ?? "—"}`, 20, y);
      y += 15;

      doc.text("----- Cash Flow Prediction -----", 20, y);
      y += 10;
      doc.text(
        `Predicted Next Month Balance: ₹ ${Number(prediction?.predicted_next_month_balance ?? 0).toLocaleString()}`,
        20,
        y
      );
      y += 15;

      if (anomalies?.length > 0) {
        doc.text("----- Unusual Expenses -----", 20, y);
        y += 10;

        anomalies.forEach((item) => {
          doc.text(`${item.title} - ₹ ${item.amount}`, 20, y);
          y += 8;
        });

        y += 10;
      }

      if (expenses?.length > 0) {
        doc.text("----- Expense List -----", 20, y);
        y += 10;

        expenses.forEach((exp) => {
          doc.text(`${exp.title} - ₹ ${exp.amount}`, 20, y);
          y += 8;

          if (y > 270) {
            doc.addPage();
            y = 20;
          }
        });
      }

      doc.save("Complete_Financial_Report.pdf");
    } catch (err) {
      console.error("Report generation failed:", err);
      alert("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={downloadReport}
      disabled={loading}
      className="btn btn-report"
    >
      {loading ? "Generating…" : "Download Complete Financial Report"}
    </button>
  );
}
