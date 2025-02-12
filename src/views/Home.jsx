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

  const navegarAdmin = ()=>{
    navigate("/login");
  }



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

  // const handleVote = async (type) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ type }),
  //     });
  //     if (!response.ok) throw new Error("Error al votar");

  //     const data = await response.json();
  //     Swal.fire({
  //       title: "Gracias por su votación!",
  //       icon: "success",
  //       draggable: true,
  //     });
  //     // Volver a cargar los votos después de votar
  //     setVotes(data.votes);
  //   } catch (error) {
  //     console.error("Error al enviar el voto", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleVote = async (type) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId") || "defaultUser"; // Cambia esto por el ID real del usuario
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, userId }),
      });
  
      if (!response.ok) throw new Error("Error al votar");
  
      const data = await response.json();
      Swal.fire({
        title: "Gracias por su votación!",
        icon: "success",
        draggable: true,
      });
  
      // Volver a cargar los votos después de votar
      setVotes(data.votes);
    } catch (error) {
      console.error("Error al enviar el voto", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <div className="d-flex justify-content-end pt-4">
        <Button variant="outline-success" onClick={navegarAdmin}>
          Login  <Image src={adminIcon} alt="admin icono" fluid />
        </Button> 
      </div>
      <div className="text-center">
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <div className="pt-2 text-center">
        <h2 className="texto-titulo">¿Cómo fue tu experiencia ?</h2>
        <h6>Seleccióna una opción para votar.</h6>
      </div>
      <section className="d-flex justify-content-center container py-3">
        <div>
          <button
            className="rounded-button satisfied-color"
            onClick={() => handleVote("satisfied")}
            disabled={loading}
          >
            <Image src={satisfecho} fluid />
          </button>
          <h1 className="texto-botones mt-3"> Satisfecho</h1>
        </div>
        <div>
          <button
            className="rounded-button neutral-color"
            onClick={() => handleVote("neutral")}
            disabled={loading}
          >
            <Image src={neutral} fluid />
          </button>
          <h1 className="texto-botones mt-3"> Neutral</h1>
        </div>
        <div>
          <button
            className="rounded-button dissatisfied-color"
            onClick={() => handleVote("unsatisfied")}
            disabled={loading}
          >
            <Image src={insatisfecho} fluid />
          </button>
          <h1 className="texto-botones mt-3"> Insatisfecho</h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
