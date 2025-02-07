import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import logo from '../assets/logo.png';

const Admin = () => {
  // Se usa la query parameter para obtener el histórico semanal
  const API_URL = "http://localhost:4000/api/votos?week=1";
  // Inicializamos el estado con un array vacío
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error("Error al obtener los votos", error);
      }
    };

    fetchVotes();
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center">
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <h1 className="mb-4 text-center">Registro de Votos - Semana Actual</h1>
      {votes.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Fecha</th>
                <th>Satisfecho</th>
                <th>Neutral</th>
                <th>Insatisfecho</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote) => (
                <tr key={vote._id}>
                  <td>{new Date(vote.date).toLocaleDateString()}</td>
                  <td>{vote.satisfied}</td>
                  <td>{vote.neutral}</td>
                  <td>{vote.unsatisfied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontraron votos o se están cargando...</p>
      )}
    </div>
  );
};

export default Admin;
