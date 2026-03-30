import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/edit/:id" element={<EditTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;