import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Panier() {
  const { cart, dispatch, total } = useCart();

  const handleRemove = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  return (
    <div>
      <h2>Mon Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide. <Link to="/">Voir les ouvrages</Link></p>
      ) : (
        <>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.titre}</td>
                  <td>{item.prix} €</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>{(item.prix * item.quantity).toFixed(2)} €</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: {total.toFixed(2)} €</h3>
          <button onClick={() => dispatch({ type: "CLEAR_CART" })}>Vider le panier</button>
        </>
      )}
    </div>
  );
}
