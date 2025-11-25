import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td>{u.username || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
