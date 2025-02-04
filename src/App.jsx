import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";

function Home({ setVotes }) {
  const handleVote = (type) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: (prevVotes[type] || 0) + 1,
    }));
    alert("Gracias por su votación");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
    <h1 className="mb-4">¿Cómo fue tu experiencia?</h1>
    <Row className="g-3 text-center">
      <Col>
        <Button 
          variant="success" 
          size="lg" 
          className="rounded-button" 
          onClick={() => handleVote("satisfied")}
        >
          A gusto
        </Button>
      </Col>
      <Col>
        <Button 
          variant="warning" 
          size="lg" 
          className="rounded-button" 
          onClick={() => handleVote("neutral")}
        >
          Neutral
        </Button>
      </Col>
      <Col>
        <Button 
          variant="danger" 
          size="lg" 
          className="rounded-button" 
          onClick={() => handleVote("unsatisfied")}
        >
          Insatisfecho
        </Button>
      </Col>
    </Row>
  </Container>
  );
}

function Admin({ votes }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Registro de Votos", 10, 10);
    doc.autoTable({
      head: [["Tipo", "Cantidad"]],
      body: [
        ["A gusto", votes.satisfied || 0],
        ["Neutral", votes.neutral || 0],
        ["Insatisfecho", votes.unsatisfied || 0],
      ],
    });
    doc.save("registro_votos.pdf");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      <h1 className="mb-4">Panel de Administración</h1>
      <Button variant="primary" onClick={generatePDF} className="mb-3">Descargar PDF</Button>
      <Card className="p-3">
        <ul className="list-unstyled">
          <li>A gusto: {votes.satisfied || 0}</li>
          <li>Neutral: {votes.neutral || 0}</li>
          <li>Insatisfecho: {votes.unsatisfied || 0}</li>
        </ul>
      </Card>
    </Container>
  );
}

function App() {
  const [votes, setVotes] = useState({ satisfied: 0, neutral: 0, unsatisfied: 0 });
  console.log("🚀 ~ App ~ votes:", votes)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setVotes={setVotes} />} />
        <Route path="/admin" element={<Admin votes={votes} />} />
      </Routes>
    </Router>
  );
}

export default App;
