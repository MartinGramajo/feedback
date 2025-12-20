// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Image } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import calendario from "../assets/calendario.png";
// import satisfecho from "../assets/felizMini.png";
// import neutral from "../assets/neutralMini.png";
// import insatisfecho from "../assets/enojadoMini.png";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // 🕒 helpers
// const formatDate = (dateStr) =>
//   new Date(dateStr).toLocaleDateString("es-AR");

// const formatTime = (dateStr) =>
//   new Date(dateStr).toLocaleTimeString("es-AR", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

// const Admin = () => {
//   // const API_URL = "https://feedbackend-bay.vercel.app/api/votos?month=1";
//   const API_URL = "http://localhost:4000/api/votos?month=1";
//   const [votes, setVotes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const logout = () => {
//     sessionStorage.clear("usuarioLogueado");
//     navigate("/");
//   };

//   // 🔄 Traer votos (SIN AGRUPAR EVENTS)
//   useEffect(() => {
//     const fetchVotes = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         console.log("VOTES RECIBIDOS:", data);
//         setVotes(data);
//       } catch (error) {
//         console.error("Error al obtener votos", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVotes();
//   }, []);

//   // 📄 PDF con detalle horario real
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text("Registro detallado de votos", 10, 10);

//     const body = [];

//     votes.forEach((vote) => {
//       vote.events?.forEach((event) => {
//         body.push([
//           vote.date,
//           formatTime(event.createdAt),
//           event.type.toUpperCase(),
//         ]);
//       });
//     });

//     doc.autoTable({
//       head: [["Fecha", "Hora", "Tipo de voto"]],
//       body,
//       startY: 20,
//     });

//     doc.save("registro_votos_detallado.pdf");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-end pt-4">
//         <Button variant="outline-success" onClick={logout}>
//           Cerrar sesión
//         </Button>
//       </div>

//       <div className="text-center">
//         <Image className="logo" src={logo} alt="logo CEO" fluid />
//       </div>

//       <h1 className="mb-4 text-center">Registro del feedback</h1>

//       {loading ? (
//         <p>Cargando votos...</p>
//       ) : votes.length > 0 ? (
//         <>
//           {/* 📊 TABLA RESUMEN */}
//           <h4 className="mt-4">Resumen diario</h4>
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>
//                     <Image src={calendario} className="me-1" />
//                     Fecha
//                   </th>
//                   <th>
//                     <Image src={satisfecho} width={20} /> Satisfecho
//                   </th>
//                   <th>
//                     <Image src={neutral} width={20} /> Neutral
//                   </th>
//                   <th>
//                     <Image src={insatisfecho} width={20} /> Insatisfecho
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {votes.map((vote) => (
//                   <tr key={vote._id}>
//                     <td>{vote.date}</td>
//                     <td>{vote.satisfied}</td>
//                     <td>{vote.neutral}</td>
//                     <td>{vote.unsatisfied}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* 🕒 TABLA DETALLE */}
//           <h4 className="mt-5">Detalle horario de votos</h4>
//           <div className="table-responsive">
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Fecha</th>
//                   <th>Hora</th>
//                   <th>Voto</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {votes.flatMap((vote) =>
//                   vote.events?.map((event, index) => (
//                     <tr key={`${vote._id}-${index}`}>
//                       <td>{vote.date}</td>
//                       <td>{formatTime(event.createdAt)}</td>
//                       <td className="d-flex align-items-center gap-2">
//                         <Image
//                           width={22}
//                           src={
//                             event.type === "satisfied"
//                               ? satisfecho
//                               : event.type === "neutral"
//                               ? neutral
//                               : insatisfecho
//                           }
//                         />
//                         {event.type.toUpperCase()}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : (
//         <p>No se encontraron votos.</p>
//       )}

//       <div className="text-center mt-4">
//         <Button
//           className="my-4 py-3"
//           variant="outline-success"
//           onClick={generatePDF}
//         >
//           Descargar PDF con detalle horario
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import calendario from "../assets/calendario.png";
import satisfecho from "../assets/felizMini.png";
import neutral from "../assets/neutralMini.png";
import insatisfecho from "../assets/enojadoMini.png";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

// 🕒 helpers
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("es-AR");

const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const Admin = () => {
  const API_URL = "https://feedbackend-bay.vercel.app/api/votos?month=1"
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear("usuarioLogueado");
    navigate("/");
  };

  // 🔄 Traer votos
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("VOTES RECIBIDOS:", data);
        setVotes(data);
      } catch (error) {
        console.error("Error al obtener votos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  // 📄 PDF con RESUMEN + DETALLE
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Registro de votos - Resumen y detalle horario", 10, 10);

    /* =========================
       📊 TABLA RESUMEN
       ========================= */
   const resumenBody = votes.map((vote) => [
  vote.date,
  vote.satisfied,
  vote.neutral,
  vote.unsatisfied,
  vote.satisfied + vote.neutral + vote.unsatisfied,
]);


 doc.autoTable({
  head: [["Fecha", "Satisfecho", "Neutral", "Insatisfecho", "Total"]],
  body: resumenBody,
  startY: 20,
  styles: { halign: "center" },
  headStyles: { fillColor: [40, 167, 69] },
});

    /* =========================
       🕒 TABLA DETALLE HORARIO
       ========================= */
    const detalleBody = [];

    votes.forEach((vote) => {
      vote.events?.forEach((event) => {
        detalleBody.push([
          vote.date,
          formatTime(event.createdAt),
          event.type.toUpperCase(),
        ]);
      });
    });

    let startDetalle = doc.lastAutoTable.finalY + 10;

    if (detalleBody.length > 0) {
      doc.text("Detalle horario de votos", 10, startDetalle - 2);

      doc.autoTable({
        head: [["Fecha", "Hora", "Tipo de voto"]],
        body: detalleBody,
        startY: startDetalle,
        styles: { halign: "center" },
        headStyles: { fillColor: [13, 110, 253] },
      });
    } else {
      doc.text("No hay eventos horarios registrados", 10, startDetalle);
    }

    doc.save("registro_votos_completo.pdf");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end pt-4">
        <Button variant="outline-success" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>

      <div className="text-center">
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <h1 className="mb-4 text-center">Registro del feedback</h1>

      {loading ? (
        <p>Cargando votos...</p>
      ) : votes.length > 0 ? (
        <>
          {/* 📊 TABLA RESUMEN */}
          <h4 className="mt-4">Resumen diario</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              {/* <thead>
                <tr>
                  <th>
                    <Image src={calendario} className="me-1" />
                    Fecha
                  </th>
                  <th>
                    <Image src={satisfecho} width={20} /> Satisfecho
                  </th>
                  <th>
                    <Image src={neutral} width={20} /> Neutral
                  </th>
                  <th>
                    <Image src={insatisfecho} width={20} /> Insatisfecho
                  </th>
                </tr>
              </thead> */}
              <thead>
                <tr>
                  <th>
                    <Image src={calendario} className="me-1" />
                    Fecha
                  </th>
                  <th>
                    <Image src={satisfecho} width={20} /> Satisfecho
                  </th>
                  <th>
                    <Image src={neutral} width={20} /> Neutral
                  </th>
                  <th>
                    <Image src={insatisfecho} width={20} /> Insatisfecho
                  </th>
                  <th>
                    <strong>Total</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {votes.map((vote) => {
                  const total =
                    vote.satisfied + vote.neutral + vote.unsatisfied;

                  return (
                    <tr key={vote._id}>
                      <td>{vote.date}</td>
                      <td>{vote.satisfied}</td>
                      <td>{vote.neutral}</td>
                      <td>{vote.unsatisfied}</td>
                      <td>
                        <strong>{total}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 🕒 TABLA DETALLE */}
          <h4 className="mt-5">Detalle horario de votos</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Voto</th>
                </tr>
              </thead>
              <tbody>
                {votes.flatMap((vote) =>
                  vote.events?.map((event, index) => (
                    <tr key={`${vote._id}-${index}`}>
                      <td>{vote.date}</td>
                      <td>{formatTime(event.createdAt)}</td>
                      <td className="d-flex align-items-center gap-2">
                        <Image
                          width={22}
                          src={
                            event.type === "satisfied"
                              ? satisfecho
                              : event.type === "neutral"
                              ? neutral
                              : insatisfecho
                          }
                        />
                        {event.type.toUpperCase()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No se encontraron votos.</p>
      )}

      <div className="text-center mt-4">
        <Button
          className="my-4 py-3"
          variant="outline-success"
          onClick={generatePDF}
        >
          Descargar PDF completo
        </Button>
      </div>
    </div>
  );
};

export default Admin;
