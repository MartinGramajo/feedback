// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Button, Form, Card, Alert, Image } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Credenciales hardcodeadas: usuario: admin, contraseña: admin123
//     if (username === "admin" && password === "junin851") {
//       localStorage.setItem("auth", "true"); // Guardar autenticación en localStorage
//       navigate("/admin");
//     } else {
//       setError("Credenciales incorrectas.");
//     }
//   };

//   return (
//     <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
//       <Card className="p-4" style={{ width: "400px" }}>
//         <div className="text-center mb-2">
//           <Image className="logo" src={logo} alt="logo CEO" fluid />
//         </div>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3" controlId="formUsername">
//             <Form.Label>Usuario</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Ingrese su usuario"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formPassword">
//             <Form.Label>Contraseña</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Ingrese su contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit" className="w-100">
//             Ingresar
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Button, Form, Card, Alert, Image } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import "bootstrap/dist/css/bootstrap.min.css";

// const API_URL = "https://feedbackend-bay.vercel.app/api/auth"; // Ajusta esto a tu backend

// const Login = ({setUsuarioActivo}) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, username, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Error en el login");

//       localStorage.setItem("auth", "true"); 
//       localStorage.setItem("userId", data.userId); // Guardar ID del usuario
//       navigate("/admin");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
//       <Card className="p-4" style={{ width: "400px" }}>
//         <div className="text-center mb-2">
//           <Image className="logo" src={logo} alt="logo CEO" fluid />
//         </div>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3" controlId="formEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Ingrese su email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formUsername">
//             <Form.Label>Usuario</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Ingrese su usuario"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formPassword">
//             <Form.Label>Contraseña</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Ingrese su contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit" className="w-100">
//             Ingresar
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Card, Alert, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://feedbackend-bay.vercel.app/api/auth"; // Ajusta esto a tu backend

const Login = ({ setUsuarioActivo }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire(
          `Bienvenido`,
          "Doctor Alejandro"
        );

        sessionStorage.setItem("usuarioLogueado", JSON.stringify(data));
        setUsuarioActivo(data);
        navigate("/admin");
      } else {
        throw new Error(data.error || "Email o contraseña incorrectos");
      }
    } catch (err) {
      Swal.fire("Ocurrió un error", err.message, "error");
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Card className="p-4" style={{ width: "400px" }}>
        <div className="text-center mb-2">
          <Image className="logo" src={logo} alt="logo CEO" fluid />
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Ingresar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
