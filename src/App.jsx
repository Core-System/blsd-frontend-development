import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PaginaDeCadastro from "./pages/PaginaDeCadastro";
import PaginaDeLogin from "./pages/PaginaDeLogin";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaGerenciarAgendamentos from "./pages/PaginaGerenciarAgendamentos";
import PaginaAgendamento from "./pages/PaginaAgendamento";
import PaginaEstoque from "./pages/PaginaEstoque";
import PaginaDashboard from "./pages/PaginaDashboard";
import PaginaClientes from "./pages/PaginaClientes";
import PaginaFuncionarios from "./pages/PaginaFuncionarios";
import PaginaPrivacidade from "./pages/PaginaPrivacidade";
import PaginaTermos from "./pages/PaginaTermos";
import PaginaTrabalheConosco from "./pages/PaginaTrabalheConosco";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<PaginaDeCadastro />} />
        <Route path="/login" element={<PaginaDeLogin />} />
        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/clientes" element={<PaginaClientes />} />
        <Route path="/funcionarios" element={<PaginaFuncionarios />} />
        <Route path="/agendamentos" element={<PaginaGerenciarAgendamentos />} />
        <Route path="/agendar" element={<PaginaAgendamento />} />
        <Route path="/estoque" element={<PaginaEstoque />} />
        <Route path="/privacidade" element={<PaginaPrivacidade />} />
        <Route path="/termos" element={<PaginaTermos />} />
        <Route path="/trabalhe-conosco" element={<PaginaTrabalheConosco />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
