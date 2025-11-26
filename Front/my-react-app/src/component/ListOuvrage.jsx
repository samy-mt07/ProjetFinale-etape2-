import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext"; 

export default function ListOuvrage() {
  const [ouvrages, setOuvrages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dispatch } = useCart(); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/ouvrages")
      .then((res) => {
        const data = res.data;
        setOuvrages(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les ouvrages");
        setLoading(false);
      });
  }, []);

  const addToCart = (ouvrage) => {
    dispatch({ type: "ADD_ITEM", payload: { ...ouvrage, quantity: 1 } });
  };

  if (loading) return <p>Chargement des ouvrages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {ouvrages.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            width: "200px",
            textAlign: "center",
          }}
        >
          {o.image_url ? (
            <img
              src={`http://localhost:8080/images/${o.image_url}`}
              alt={o.titre}
              style={{ width: "100%", height: "auto", marginBottom: "0.5rem" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "0.5rem",
              }}
            >
              Pas d'image
            </div>
          )}
          <h3>{o.titre}</h3>
          <p>{o.auteur}</p>
          <p>{o.prix} $</p>
          <p>Stock : {o.stock}</p>
          <button
            onClick={() => addToCart(o)}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}

