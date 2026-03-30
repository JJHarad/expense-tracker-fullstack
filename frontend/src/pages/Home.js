import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // 🔐 Protect route (if no token → redirect)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // 📥 Fetch data
  useEffect(() => {
    API.get("/transactions")
      .then(res => setData(res.data))
      .catch(() => alert("Error fetching data"));
  }, []);

  // 🧮 Dashboard calculations
  const totalExpense = data
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = data
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch {
      alert("Delete failed ❌");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      {/* 🔝 Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Expense Tracker</h1>
        <button onClick={handleLogout} style={{ padding: "8px", backgroundColor: "red", color: "white" }}>
          Logout
        </button>
      </div>

      {/* 📊 Dashboard */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ background: "#d4edda", padding: "15px", borderRadius: "8px" }}>
          <h3>Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div style={{ background: "#f8d7da", padding: "15px", borderRadius: "8px" }}>
          <h3>Expense</h3>
          <p>₹{totalExpense}</p>
        </div>

        <div style={{ background: "#d1ecf1", padding: "15px", borderRadius: "8px" }}>
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      {/* ➕ Add Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/add")}
          style={{ padding: "10px", backgroundColor: "blue", color: "white" }}
        >
          + Add Transaction
        </button>
      </div>

      {/* 📋 Transactions List */}
      <div style={{ marginTop: "20px" }}>
        <h2>Transactions</h2>

        {data.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          data.map((t) => (
            <div
              key={t.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{t.title}</strong> <br />
                ₹{t.amount} ({t.type})
              </div>

              <div>
                <button
                  onClick={() => navigate(`/edit/${t.id}`)}
                  style={{ marginRight: "10px" }}
                >
                  Edit ✏️
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;