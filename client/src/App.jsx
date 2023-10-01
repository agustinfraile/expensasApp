// import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home/Home";

import SlideBar from "./components/SlideBar/SlideBar";
import MisDepartamentos from "./pages/MisDepartamentos/MisConsorcios";
import AgregarDepto from "./pages/AgregarDepto/AgregarDepto";
import InfoDepto from "./pages/InfoDepto/InfoDepto";


function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <SlideBar />
          <Routes>
            <Route path="/" element={<Home/>} />
            

            <Route path="/departamentos" element={<MisDepartamentos/>} />
            <Route path="/departamento/nuevo" element={<AgregarDepto/>} />
            <Route path="/departamento/:id" element={<InfoDepto/>} />
            

          </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
