import PaginaDeCadastro from "./pages/PaginaDeCadastro";
import PaginaDeLogin from "./pages/PaginaDeLogin";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaGerenciarAgendamentos from "./pages/PaginaGerenciarAgendamentos";
import PaginaAgendamento from "./pages/PaginaAgendamento";
import PaginaEstoque from "./pages/PaginaEstoque";
import PaginaDashboard from "./pages/PaginaDashboard";
import PaginaClientes from "./pages/PaginaClientes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<PaginaDeCadastro />} />
        <Route path="/login" element={<PaginaDeLogin />} />
        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/clientes" element={<PaginaClientes />} />
        <Route path="/agendamentos" element={<PaginaGerenciarAgendamentos />} />
        <Route path="/agendar" element={<PaginaAgendamento />} />
        <Route path="/estoque" element={<PaginaEstoque />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
