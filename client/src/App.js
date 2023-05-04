import "./App.css";
import { Route } from "react-router-dom"; // IMPORTAMOS ROUTE PARA PODER RENDERIZAR NUESTRAS VISTAS EN LA RUTA QUE SE LE INDICA
import Home from "./Vistas/Home/Home"; // IMPORTAMOS LOS COMPONENTES
import LandingPage from "./Vistas/LandingPage/LandingPage";
import Detail from "./Vistas/Detail/Detail";
import Form from "./Vistas/Form/Form";

// EXACT PATH PARA QUE EXACTAMENTE VAYA A LA RUTA "/" PORQUE SINO LA LANDING APARECE EN TODOS LADOS

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/videogames" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/form" component={Form} />
    </div>
  );
}

export default App;
