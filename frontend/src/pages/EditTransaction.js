import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    category: "",
    date: ""
  });

  useEffect(() => {
    API.get("/transactions")
      .then(res => {
        const t = res.data.find(item => item.id === id);
        if (t) setForm(t);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/transactions/${id}`, form);
      alert("Updated ✅");
      navigate("/home");
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div>
      <h2>Edit Transaction</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} /><br/><br/>
        <input name="amount" value={form.amount} onChange={handleChange} /><br/><br/>

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="EXPENSE">EXPENSE</option>
          <option value="INCOME">INCOME</option>
        </select><br/><br/>

        <input name="category" value={form.category} onChange={handleChange} /><br/><br/>
        <input name="date" type="date" value={form.date} onChange={handleChange} /><br/><br/>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTransaction;