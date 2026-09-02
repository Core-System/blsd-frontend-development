import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BalaoAgendamentos from './BalaoAgendamentos';
import ModalEditarPerfil from './ModalEditarPerfil';
import { atualizarCliente, atualizarFotoCliente, listarCliente } from '../services/clienteService';
import { atualizarFotoFuncionario, atualizarFuncionario, buscarFuncionarioPorId } from '../services/funcionarioService';

const links = ['Início', 'Procedimentos', 'Sobre nós', 'Contato'];


export default function BarraDeNavegacaoSuperior() {
  const { usuario, logout, salvarUsuario, temPermissao } = useAuth();
  const navigate = useNavigate();

  const primeiroNome = usuario?.nome?.split(' ')[0] || 'Visitante';

  const [mensagemLogin, setMensagemLogin] = useState(null);
  const [mensagemDashboard, setMensagemDashboard] = useState(null);

  const [cliente, setCliente] = useState([]);
  const [, setCarregando] = useState(true);
  const [, setErroApi] = useState(null);

  const [clienteEditando, setClienteEditando] = useState(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  const [mensagemSucessoEdicao, setMensagemSucessoEdicao] = useState(false);

  function aoClicarAgendar() {
    if (!usuario) {
      setMensagemLogin(true);
      setTimeout(() => setMensagemLogin(false), 4000);
      return;
    }
    navigate('/agendar');
  }

  function aoClicarDashboard() {
    if (!usuario) {
      setMensagemDashboard(true)
      setTimeout(() => setMensagemDashboard(false), 4000);
      return;
    }
    navigate("/dashboard")
  }

  function aoSair() {
    logout();
    navigate('/login');
  }

  const rolarParaSecao = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const carregar = useCallback(async () => {
    if (!usuario?.id) {
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErroApi(null);
    try {
      let data;
      if (temPermissao(['GESTOR', 'FUNCIONARIO'])) {
        data = await buscarFuncionarioPorId(usuario.id);
      } else {
        data = await listarCliente(usuario.id);
      }
      setCliente(data);
    } catch (e) {
      console.error('Erro ao carregar dados do usuário:', e);
      setErroApi('Não foi possível carregar os dados. Verifique a conexão.');
    } finally {
      setCarregando(false);
    }
  }, [usuario?.id, temPermissao]);

  useEffect(() => { carregar(); }, [carregar]);

  async function handleSalvarEdicao(id, dados, arquivoFoto) {
    setSalvandoEdicao(true);
    try {
      const payload = {
        ...dados
      };

      const ehFuncionario = temPermissao(['GESTOR', 'FUNCIONARIO']);

      if (ehFuncionario) {
        await atualizarFuncionario(id, payload);
      } else {
        await atualizarCliente(id, payload);
      }

      if (arquivoFoto) {
        if (ehFuncionario) {
          await atualizarFotoFuncionario(id, arquivoFoto);
        } else {
          await atualizarFotoCliente(id, arquivoFoto);
        }
      }

      const usuarioAtualizado = ehFuncionario
        ? await buscarFuncionarioPorId(id)
        : await listarCliente(id);

      const tokenAtual = localStorage.getItem('token');
      salvarUsuario({ token: tokenAtual, nome: usuarioAtualizado.nome });

      await carregar();
      setClienteEditando(null);
      setMensagemSucessoEdicao(true);
      setTimeout(() => setMensagemSucessoEdicao(false), 4000);

    } catch (e) {
      console.error('Erro ao atualizar perfil:', e);
      throw e;
    } finally {
      setSalvandoEdicao(false);
    }
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full border-b border-[#e8e6d9] bg-[#f8f7f2]/85 px-6 py-3 backdrop-blur-xl shadow-[0_8px_24px_rgba(25,35,29,0.05)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer bg-transparent text-xl font-black tracking-tight text-[#1f2e27] transition hover:text-[#2D4336]"
        >
          Blessed 7
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => {
                if (link === 'Início') rolarParaSecao('inicio');
                if (link === 'Procedimentos') rolarParaSecao('procedimentos');
                if (link === 'Sobre nós') rolarParaSecao('sobre-nos');
                if (link === 'Contato') rolarParaSecao('footer');
              }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#4b5d4f] transition-all hover:bg-[#edf3ef] hover:text-[#2D4336]"
            >
              {link}
            </button>
          ))}
          {temPermissao(['CLIENTE']) && (
            <button
              onClick={aoClicarAgendar}
              className="rounded-full bg-[#edf3ef] px-4 py-2 text-sm font-bold text-[#2D4336] transition-all hover:bg-[#dfece1]"
            >
              Agende
            </button>)}
          {temPermissao(['GESTOR', 'FUNCIONARIO']) && (<button
            onClick={aoClicarDashboard}
            className="rounded-full bg-[#edf3ef] px-4 py-2 text-sm font-bold text-[#2D4336] transition-all hover:bg-[#dfece1]"
          >
            Dashboard
          </button>)}
        </div>

        <div className="flex items-center gap-3">
          {usuario ? (
            <>
              {temPermissao(['CLIENTE']) && (
                <BalaoAgendamentos />
              )}
              <span className="hidden text-sm text-[#4b5d4f] sm:inline">
                Olá, <strong>{primeiroNome}</strong>
              </span>
              <div onClick={() => setClienteEditando(cliente)} className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#8B7355]">
                {cliente?.urlFoto ? (
                  <img
                    src={
                      cliente.urlFoto.startsWith('http')
                        ? cliente.urlFoto
                        : `http://localhost:8080${cliente.urlFoto.startsWith('/') ? '' : '/'}${cliente.urlFoto}`
                    }
                    alt="Perfil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" />
                  </svg>
                )}
              </div>
              <button
                onClick={aoSair}
                className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="rounded-full bg-[#2D4336] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23372b]"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
      {/* Toast de aviso */}
      {mensagemLogin && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C3E2D] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium animate-fade-in">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          <span>Você precisa estar logado para agendar.</span>
          <button
            onClick={() => navigate('/login')}
            className="ml-2 text-[#d4b055] font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Entrar
          </button>
        </div>
      )}
      {mensagemDashboard && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C3E2D] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium animate-fade-in">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          <span>Você precisa estar logado para ir para a dashboard.</span>
          <button
            onClick={() => navigate('/login')}
            className="ml-2 text-[#d4b055] font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Entrar
          </button>
        </div>
      )}
      {mensagemSucessoEdicao && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C3E2D] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium animate-fade-in">
          {/* Ícone de Check/Sucesso */}
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a8c5a0" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Perfil atualizado com sucesso!</span>
        </div>
      )}
      {clienteEditando && (
        <ModalEditarPerfil
          cliente={clienteEditando}
          isFuncionario={temPermissao(['GESTOR', 'FUNCIONARIO'])}
          onFechar={() => setClienteEditando(null)}
          onSalvar={handleSalvarEdicao}
          salvando={salvandoEdicao}
        />
      )}
    </nav>

  );
}