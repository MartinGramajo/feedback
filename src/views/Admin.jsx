// import { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Image } from 'react-bootstrap';
// import logo from '../assets/logo.png';
// import satisfecho from '../assets/felizMini.png';
// import neutral from '../assets/neutralMini.png';
// import insatisfecho from '../assets/enojadoMini.png';
// import calendario from '../assets/calendario.png';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Admin = () => {
//   const API_URL = "https://feedbackend-bay.vercel.app/api/votos?month=1";
//   const [votes, setVotes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVotes = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         console.log("Datos recibidos:", data); // 👀 Verifica la estructura en consola
        
//         // Suponiendo que el objeto contiene los votos directamente
//         const mappedVotes = [{
//           _id: "unique_id",  // Puedes agregar un identificador único si es necesario
//           date: new Date(data.createdAt).toLocaleDateString(), // Utilizando la fecha de creación del objeto
//           satisfied: data.satisfied,
//           neutral: data.neutral,
//           unsatisfied: data.unsatisfied
//         }];
        
//         setVotes(mappedVotes);
//       } catch (error) {
//         console.error("Error al obtener los votos", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchVotes();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('auth');
//     navigate('/');
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text("Registro de Votos - Mes Actual", 10, 10);
//     const body = votes.map(vote => [
//       vote.date,
//       vote.satisfied,
//       vote.neutral,
//       vote.unsatisfied
//     ]);
//     doc.autoTable({
//       head: [["Fecha", "Satisfecho", "Neutral", "Insatisfecho"]],
//       body: body,
//     });
//     doc.save("registro_votos.pdf");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-end pt-4">
//         <Button variant="outline-success" onClick={handleLogout}>
//           Cerrar sesión
//         </Button>
//       </div>

//       <div className="text-center">
//         <Image className="logo" src={logo} alt="logo CEO" fluid />
//       </div>

//       <h1 className="mb-4 text-center">Registro de Votos - Mes Actual</h1>
//       {loading ? (
//         <p>Cargando votos...</p>
//       ) : votes && votes.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead className="thead-dark">
//               <tr>
//                 <th>
//                   <Image className="me-1" src={calendario} alt="Calendario" fluid />
//                   <span className="mt-1"> Fecha</span>
//                 </th>
//                 <th>
//                   <Image className="me-1" src={satisfecho} alt="Satisfecho" fluid />
//                   <span className="mt-1">Satisfecho</span>
//                 </th>
//                 <th>
//                   <Image className="me-1" src={neutral} alt="Neutral" fluid />
//                   <span className="mt-1">Neutral</span>
//                 </th>
//                 <th>
//                   <Image className="me-1" src={insatisfecho} alt="Insatisfecho" fluid />
//                   <span className="mt-1">Insatisfecho</span>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {votes.map((vote) => (
//                 <tr key={vote._id}>
//                   <td>{vote.date}</td>
//                   <td>{vote.satisfied}</td>
//                   <td>{vote.neutral}</td>
//                   <td>{vote.unsatisfied}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No se encontraron votos o se están cargando...</p>
//       )}

//       <div className="text-center mt-3">
//         <Button className='my-4 py-4' variant="outline-success" onClick={generatePDF}>
//           Descargar PDF para tener el registro mensual
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Admin;


import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Image } from 'react-bootstrap';
import logo from '../assets/logo.png';
import satisfecho from '../assets/felizMini.png';
import neutral from '../assets/neutralMini.png';
import insatisfecho from '../assets/enojadoMini.png';
import calendario from '../assets/calendario.png';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Admin = () => {
  const API_URL = "https://feedbackend-bay.vercel.app/api/votos?month=1";
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchVotes = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(API_URL);
  //       const data = await response.json();
  //       console.log("Datos recibidos:", data);
  
  //       // Limpiar los votos previos antes de asignar nuevos
  //       setVotes([]);
  //       if (data && data._id) {
  //         const mappedVotes = [{
  //           _id: data._id,
  //           date: new Date(data.updatedAt).toLocaleDateString(),
  //           satisfied: data.satisfied,
  //           neutral: data.neutral,
  //           unsatisfied: data.unsatisfied,
  //         }];
  //         setVotes(mappedVotes);
  //       } else {
  //         console.log("No se encontraron votos en la respuesta de la API");
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener los votos", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchVotes();
  // }, []);  
  
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
  
        const groupedVotes = data.reduce((acc, vote) => {
          const key = `${vote.date}-${vote.userId}`;
          if (!acc[key]) {
            acc[key] = { ...vote };
          } else {
            acc[key].satisfied += vote.satisfied;
            acc[key].neutral += vote.neutral;
            acc[key].unsatisfied += vote.unsatisfied;
          }
          return acc;
        }, {});
  
        setVotes(Object.values(groupedVotes));
      } catch (error) {
        console.error("Error al obtener los votos", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVotes();
  }, []);
  
  

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Registro de Votos - Mes Actual", 10, 10);
  
    // Verifica si hay votos disponibles
    if (votes && votes.length > 0) {
      const body = votes.map(vote => [
        vote.date,
        vote.satisfied,
        vote.neutral,
        vote.unsatisfied
      ]);
  
      // Crear la tabla en el PDF
      doc.autoTable({
        head: [["Fecha", "Satisfecho", "Neutral", "Insatisfecho"]],
        body: body,
      });
  
      // Descargar el PDF
      doc.save("registro_votos.pdf");
    } else {
      console.log("No hay votos para generar el PDF");
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end pt-4">
        <Button variant="outline-success" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <div className="text-center">
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <h1 className="mb-4 text-center">Registro del feedback</h1>
      {loading ? (
        <p>Cargando votos...</p>
      ) : votes && votes.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>
                  <Image className="me-1" src={calendario} alt="Calendario" fluid />
                  <span className="mt-1"> Fecha</span>
                </th>
                <th>
                  <Image className="me-1" src={satisfecho} alt="Satisfecho" fluid />
                  <span className="mt-1">Satisfecho</span>
                </th>
                <th>
                  <Image className="me-1" src={neutral} alt="Neutral" fluid />
                  <span className="mt-1">Neutral</span>
                </th>
                <th>
                  <Image className="me-1" src={insatisfecho} alt="Insatisfecho" fluid />
                  <span className="mt-1">Insatisfecho</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote) => (
                <tr key={vote._id}>
                  <td>{vote.date}</td>
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

      <div className="text-center mt-3">
        <Button className='my-4 py-4' variant="outline-success" onClick={generatePDF}>
          Descargar PDF para tener el registro mensual
        </Button>
      </div> 
    </div>
  );
};

export default Admin;
