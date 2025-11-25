import { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import styles from "./Cart.module.css"

export default function Login() {
  const [form, setForm] = useState({ email: "", password_hash: "", remember: false });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, form);
      localStorage.setItem("token", res.data.token);
      setMessage("Connexion réussie !");
    } catch (err) {
      setMessage("Erreur: " + err.response?.data?.message);
    }
  };

  return (
    <div className={styles.cardForm}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Col>
          
          <Col xs="auto">
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={form.password_hash}
              onChange={(e) => setForm({ ...form, password_hash: e.target.value })}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Se connecter</Button>
          </Col>
        </Row>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}
