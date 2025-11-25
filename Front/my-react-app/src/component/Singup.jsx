import styles from "./Cart.module.css"
import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    password_hash: "",
    checkbox: false,
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        form
      );
      setMessage("Utilisateur créé ! Token: " + res.data.token);
    } catch (err) {
      setMessage("Erreur: " + err.response?.data?.message);
    }
  };

  return (
    <div className={styles.cardForm}>
      <h1>Signup</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNom">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={form.password_hash}
            onChange={(e) =>
              setForm({ ...form, password_hash: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formCheckbox">
          <Form.Check
            type="checkbox"
            label="Check me out"
            checked={form.checkbox}
            onChange={(e) => setForm({ ...form, checkbox: e.target.checked })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
}

