export default function DashboardCards() {
  return (
    <div style={{display:"flex", gap:"20px", marginBottom:"20px",  flexWrap: "wrap"}}>
      
      <div className="card">
        <h3>Total Expenses</h3>
        <p>₹0</p>
      </div>

      <div className="card">
        <h3>Total Payroll</h3>
        <p>₹0</p>
      </div>

      <div className="card">
        <h3>Net Balance</h3>
        <p>₹0</p>
      </div>

      <div className="card">
        <h3>Burn Rate</h3>
        <p>₹0</p>
      </div>

    </div>
  );
}
