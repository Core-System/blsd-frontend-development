import PaginaDeCadastro from "./pages/PaginaDeCadastro";
import PaginaDeLogin from "./pages/PaginaDeLogin";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaGerenciarAgendamentos from "./pages/PaginaGerenciarAgendamentos";
import PaginaAgendamento from "./pages/PaginaAgendamento";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<PaginaDeCadastro />} />
        <Route path="/login" element={<PaginaDeLogin />} />
        <Route path="/agendamentos" element={<PaginaGerenciarAgendamentos />} />
        <Route path="/agendar" element={<PaginaAgendamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;