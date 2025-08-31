// import { useEffect, useState } from "react";
// import satisfecho from "../assets/feliz.png";
// import neutral from "../assets/neutral.png";
// import insatisfecho from "../assets/enojado.png";
// import logo from "../assets/logo.png";
// import adminIcon from "../assets/admin.png";
// import { Button, Image } from "react-bootstrap";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const API_URL = "https://feedbackend-bay.vercel.app/api/votos";
//   const [votes, setVotes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cursorEffect, setCursorEffect] = useState(false);
//   const navigate = useNavigate();

//   const navegarAdmin = () => {
//     navigate("/login");
//   };

//   useEffect(() => {
//     const fetchVotes = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setVotes((prevVotes) => [...prevVotes, data]);
//       } catch (error) {
//         console.error("Error al obtener los votos", error);
//       }
//     };

//     fetchVotes();
//   }, []);

//   const handleVote = async (type) => {
//     try {
//       setLoading(true);
//       setCursorEffect(true); // Activa el efecto del cursor
//       const userId = localStorage.getItem("userId") || "defaultUser";

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type, userId }),
//       });

//       if (!response.ok) throw new Error("Error al votar");

//       const data = await response.json();
//       Swal.fire({
//         title: "Gracias por su votación!",
//         icon: "success",
//         draggable: true,
//       });

//       setVotes(data.votes);

//       // Elimina el efecto después de 1 segundo
//       setTimeout(() => setCursorEffect(false), 1000);
//     } catch (error) {
//       console.error("Error al enviar el voto", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (cursorEffect) {
//       document.body.classList.add("cursor-effect");
//     } else {
//       document.body.classList.remove("cursor-effect");
//     }
//   }, [cursorEffect]);

//   return (
//     <div className="container">
//       <div className="d-flex justify-content-end pt-4">
//         <Button variant="outline-success" onClick={navegarAdmin}>
//           Login <Image src={adminIcon} alt="admin icono" fluid />
//         </Button>
//       </div>
//       <div className="text-center">
//         <Image className="logo" src={logo} alt="logo CEO" fluid />
//       </div>

//       <div className="pt-4 text-center">
//         <h2 style={{fontSize:'48px', marginBottom:'32px'}}>¿COMO FUE TU EXPERIENCIA EN CEO?</h2>
//         <h3>Selecciona una opción para votar.</h3>
//       </div>
//       <section className="d-flex justify-content-center container py-5">
//         <div>
//           <button
//             className="rounded-button satisfied-color"
//             onClick={() => handleVote("satisfied")}
//             disabled={loading}
//           >
//             <Image src={satisfecho} fluid />
//           </button>
//           <h1 className="texto-botones mt-3">SATISFECHO</h1>
//         </div>
//         <div>
//           <button
//             className="rounded-button neutral-color"
//             onClick={() => handleVote("neutral")}
//             disabled={loading}
//           >
//             <Image src={neutral} fluid />
//           </button>
//           <h1 className="texto-botones mt-3">NEUTRAL</h1>
//         </div>
//         <div>
//           <button
//             className="rounded-button dissatisfied-color"
//             onClick={() => handleVote("unsatisfied")}
//             disabled={loading}
//           >
//             <Image src={insatisfecho} fluid />
//           </button>
//           <h1 className="texto-botones mt-3">INSATISFECHO</h1>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import satisfecho from "../assets/feliz.png";
import neutral from "../assets/neutral.png";
import insatisfecho from "../assets/enojado.png";
import logo from "../assets/logo.png";
import adminIcon from "../assets/admin.png";
import { Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const API_URL = "https://feedbackend-bay.vercel.app/api/votos";
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navegarAdmin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setVotes((prevVotes) => [...prevVotes, data]);
      } catch (error) {
        console.error("Error al obtener los votos", error);
      }
    };

    fetchVotes();
  }, []);

  const handleVote = async (type) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId") || "defaultUser";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, userId }),
      });

      if (!response.ok) throw new Error("Error al votar");

      const data = await response.json();

      Swal.fire({
        title: "SU VOTO FUE ENVIADO CORRECTAMENTE",
        text: "Gracias por su votación!",
        icon: "success",
        confirmButtonColor: "#28a745",
      });

      setVotes(data.votes);
    } catch (error) {
      console.error("Error al enviar el voto", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el voto, intente nuevamente.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      {/* Overlay con loader animado */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          <div className="dots-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p style={{ marginTop: "16px", fontSize: "26px", color: "#333" }}>
            Enviando su respuesta...
          </p>
        </div>
      )}

      <div className="d-flex justify-content-end pt-4">
        <Button variant="outline-success" onClick={navegarAdmin}>
          Login <Image src={adminIcon} alt="admin icono" fluid />
        </Button>
      </div>

      <div className="text-center">
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <div className="pt-4 text-center">
        <h2 style={{ fontSize: "32px", marginBottom: "32px", fontWeight: "bold" }}>
          ¿CÓMO FUE TU EXPERIENCIA EN CEO?
        </h2>
        <h3>Selecciona una opción para votar.</h3>
      </div>

      <section className="d-flex justify-content-center container py-5">
        <div>
          <button
            className="rounded-button satisfied-color"
            onClick={() => handleVote("satisfied")}
            disabled={loading}
          >
            <Image src={satisfecho} fluid />
          </button>
          <h1 className="texto-botones mt-3">SATISFECHO</h1>
        </div>
        <div>
          <button
            className="rounded-button neutral-color"
            onClick={() => handleVote("neutral")}
            disabled={loading}
          >
            <Image src={neutral} fluid />
          </button>
          <h1 className="texto-botones mt-3  ">NEUTRAL</h1>
        </div>
        <div>
          <button
            className="rounded-button dissatisfied-color"
            onClick={() => handleVote("unsatisfied")}
            disabled={loading}
          >
            <Image src={insatisfecho} fluid />
          </button>
          <h1 className="texto-botones mt-3">INSATISFECHO</h1>
        </div>
      </section>
    </div>
  );
};

export default Home;

<style>
{`
.dots-loader {
  display: flex;
  gap: 8px;
}

.dots-loader span {
  width: 12px;
  height: 12px;
  background: #28a745;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.dots-loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots-loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from { transform: translateY(0); opacity: 0.6; }
  to { transform: translateY(-12px); opacity: 1; }
}
`}
</style>
