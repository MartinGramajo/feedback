import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </Router>
      
    </div>
  )

};


export default App;
