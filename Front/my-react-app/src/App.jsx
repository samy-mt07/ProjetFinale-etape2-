import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import Signup from "./component/Singup";
import Login from "./component/Loging";
import Users from "./component/Users";
import ListOuvrage from "./component/ListOuvrage";
import Panier from "./component/Panier"
import { CartProvider } from "./context/CartContext"; 

export default function App() {
  return (
    <CartProvider> 
      <Router>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<ListOuvrage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/panier" element={<Panier />} /> 
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
