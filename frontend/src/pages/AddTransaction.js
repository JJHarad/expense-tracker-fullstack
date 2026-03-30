import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    category: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", form);
      alert("Transaction added ✅");
      navigate("/home");
    } catch (err) {
      alert("Error adding transaction ❌");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br/><br/>
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} /><br/><br/>

        <select name="type" onChange={handleChange}>
          <option value="EXPENSE">EXPENSE</option>
          <option value="INCOME">INCOME</option>
        </select><br/><br/>

        <input name="category" placeholder="Category" onChange={handleChange} /><br/><br/>
        <input name="date" type="date" onChange={handleChange} /><br/><br/>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;