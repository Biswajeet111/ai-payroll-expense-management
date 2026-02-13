import "../App.css";

export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <div>
        <h2 className="logoText">AI Payroll</h2>

        {/* Balance Card */}
        <div className="balanceCard">
          <h3>₹ 2,000</h3>
          <small>Balance</small>
        </div>

        {/* Menu */}
        <ul className="menu">
          <li onClick={() => setPage("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setPage("addMember")}>➕ Add Member</li>
          <li>📊 Insight</li>
          <li>💳 Transaction</li>
          <li>👤 Account</li>
          <li>⚙ Settings</li>
        </ul>
      </div>

      {/* Bottom Menu */}
      <div className="bottomMenu">
        <div>➕ Add Account</div>
        <div>🔄 Switch Account</div>
        <div>🚪 Log Out</div>
      </div>
    </div>
  );
}
