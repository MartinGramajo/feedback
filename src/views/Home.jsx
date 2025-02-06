import { useEffect, useState } from "react";
import satisfecho from "../assets/feliz.png";
import neutral from "../assets/neutral.png";
import insatisfecho from "../assets/enojado.png";
import logo from "../assets/logo.png";
import { Image } from "react-bootstrap";
import Swal from "sweetalert2";

const Home = () => {
  const API_URL = "http://localhost:4000/api/votos";
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleVote = async (type) => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
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
    <div className="container text-center">
      <div>
        <Image className="logo" src={logo} alt="logo CEO" fluid />
      </div>

      <div className="pt-2">
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
