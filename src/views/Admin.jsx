import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const API_URL = "http://localhost:4000/api/votos";
  const [votes, setVotes] = useState(null);


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
      <h1 className="mb-4 text-center">Encuesta de Satisfacción</h1>
      {votes ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Estado</th>
                <th>Cantidad de Votos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Satisfecho</td>
                <td>{votes.satisfied}</td>
              </tr>
              <tr>
                <td>Neutral</td>
                <td>{votes.neutral}</td>
              </tr>
              <tr>
                <td>Insatisfecho</td>
                <td>{votes.unsatisfied}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Cargando votos...</p>
      )}
    </div>
  );
};

export default Admin;
