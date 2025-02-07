import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Image } from 'react-bootstrap';
import logo from '../assets/logo.png';
import satisfecho from '../assets/felizMini.png';
import neutral from '../assets/neutralMini.png';
import insatisfecho from '../assets/enojadoMini.png';
import calendario from '../assets/calendario.png';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  // Función para cerrar sesión: remueve el flag de autenticación y redirige al login.
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  }

  return (
    <div className="container mt-4">
   <div className="d-flex justify-content-end pt-4">
        <Button variant="outline-success" onClick={handleLogout}>
          Cerrar session
        </Button> 
      </div>

      <div className="text-center">
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <h1 className="mb-4 text-center">Registro de Votos - Semana Actual</h1>
      {votes.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th><Image className='me-1' src={calendario} alt="satifescho icono" fluid /> <span className='mt-1'> Fecha</span> </th>
                <th><Image className='me-1' src={satisfecho} alt="satifescho icono" fluid /> <span className='mt-1'>Satisfecho</span> </th>
                <th><Image className='me-1' src={neutral} alt="satifescho icono" fluid /> <span className='mt-1'>Neutral</span> </th>
                <th><Image className='me-1' src={insatisfecho} alt="satifescho icono" fluid /> <span className='mt-1'>Insatisfecho</span></th>
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
