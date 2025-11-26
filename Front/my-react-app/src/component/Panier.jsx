

import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";

export default function Panier() {
  const { cart, dispatch, total } = useCart();

  const handleRemove = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mon Panier</h2>

      {cart.length === 0 ? (
        <p>
          Votre panier est vide. <Link to="/">Voir les ouvrages</Link>
        </p>
      ) : (
        <>
          <Table striped bordered hover responsive>
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
                  <td>{item.prix} $</td>
                  <td style={{ maxWidth: "100px" }}>
                    <Form.Control
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
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h4>Total: {total.toFixed(2)} $</h4>
            <Button
              variant="success"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              Vider le panier
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
