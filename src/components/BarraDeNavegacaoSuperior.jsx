import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BalaoAgendamentos from './BalaoAgendamentos';
import { atualizarCliente, listarCliente } from '../services/clienteService';

const iconeEditar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const iconeFechar = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const links = ['Início', 'Procedimentos', 'Sobre nós', 'Contato'];


function Campo({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-4 py-2.5 bg-[#f5f4ec] border border-[#e8e6d9] rounded-lg text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#2C3E2D] focus:ring-1 focus:ring-[#2C3E2D]/20 transition-colors';


function ModalEdicao({ cliente, onFechar, onSalvar, salvando }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    dataNasc: '',
    telefone: ''
  });
  const [erros, setErros] = useState({});

  // Sincroniza os dados assim que o componente receber o objeto cliente
  useEffect(() => {
    if (cliente) {
      setForm({
        nome: cliente.nome || '',
        email: cliente.email || '',
        dataNasc: cliente.dataNasc || '',
        telefone: cliente.telefone || ''
      });
    }
  }, [cliente]);

  function handleForm(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Nome obrigatório';
    if (!form.email.includes('@')) e.email = 'E-mail inválido';
    if (form.telefone.replace(/\D/g, "").length < 11) e.telefone = 'Telefone Incompleto';
    return e;
  }

  // Tratando a máscara diretamente no handleForm do input
  const aoDigitarTelefone = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, "");
    const formatado = apenasNumeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    
    handleForm('telefone', formatado);
  };

  function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length) { setErros(e); return; }
    onSalvar(cliente.id, form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#e8e6d9] shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f0f5f0] flex items-center justify-center text-[#2C3E2D]">
              {iconeEditar}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Editar Perfil</h2>
              <p className="text-[11px] text-gray-400">Atualize seus dados</p>
            </div>
          </div>
          <button onClick={onFechar} className="text-gray-400 hover:text-gray-700 transition-colors">
            {iconeFechar}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Campo label="Nome completo">
            <input
              value={form.nome}
              onChange={(e) => handleForm('nome', e.target.value)}
              placeholder="Ex.: Patricia Ferreira"
              className={inputCls + (erros.nome ? ' border-red-400' : '')}
            />
            {erros.nome && <p className="text-[10px] text-red-500">{erros.nome}</p>}
          </Campo>

          <Campo label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleForm('email', e.target.value)}
              placeholder="patricia@blessed7.com"
              className={inputCls + (erros.email ? ' border-red-400' : '')}
            />
            {erros.email && <p className="text-[10px] text-red-500">{erros.email}</p>}
          </Campo>

          <Campo label="Data de Nascimento">
            <input
              value={form.dataNasc}
              placeholder="01/01/2006"
              maxLength={10}
              disabled
              className={inputCls + ' opacity-60 cursor-not-allowed'}
            />
          </Campo>

          <Campo label="Telefone">
            <div className="relative">
              <input
                type="text"
                value={form.telefone}
                onChange={aoDigitarTelefone}
                placeholder="(11) 98765-4321"
                className={inputCls + ' pr-10' + (erros.telefone ? ' border-red-400' : '')}
              />
            </div>
            {erros.telefone && <p className="text-[10px] text-red-500">{erros.telefone}</p>}
          </Campo>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onFechar}
            className="flex-1 px-4 py-2.5 border border-[#e8e6d9] text-gray-600 text-sm font-semibold rounded-lg hover:bg-[#f5f4ec] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={salvando}
            className="flex-1 px-4 py-2.5 bg-[#2C3E2D] hover:bg-[#243325] text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-60"
          >
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BarraDeNavegacaoSuperior() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const primeiroNome = usuario?.nome?.split(' ')[0] || 'Visitante';

  const [mensagemLogin, setMensagemLogin] = useState(null);
  const [mensagemDashboard, setMensagemDashboard] = useState(null);

  const [cliente, setCliente] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState(null);

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

  function aoClicarDashboard(){
    if(!usuario){
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
      setCarregando(true);
      setErroApi(null);
      try {
        const data = await listarCliente(usuario.id);
        setCliente(data);
      } catch (e) {
        console.error('Erro ao carregar cliente:', e);
        setErroApi('Não foi possível carregar o cliente. Verifique a conexão com o servidor.');
      } finally {
        setCarregando(false);
      }
    }, []);
  
    useEffect(() => { carregar(); }, [carregar]);

    function handleForm(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
    setErroForm(null);
  }


  async function handleSalvarEdicao(id, dados) {
      setSalvandoEdicao(true);
      try {
        // se senha vazia, usa placeholder pois backend exige — idealmente o backend aceitaria sem campo senha para update
        const payload = {
          nome: dados.nome,
          email: dados.email,
          dataNasc: dados.dataNasc,
          telefone: dados.telefone || undefined,
        };
        await atualizarCliente(id, payload);
        await carregar();
        setClienteEditando(null);
        setMensagemSucessoEdicao(true);
        setTimeout(() => setMensagemSucessoEdicao(false), 4000);
      } catch (e) {
        console.error('Erro ao atualizar:', e);
        alert('Erro ao atualizar cliente. Tente novamente.');
      } finally {
        setSalvandoEdicao(false);
      }
    }

    

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full bg-[#f8f7f2] border-b border-[#e8e6d9] px-6 py-4 flex items-center justify-between">
      {/* Header da pagina inicial */}
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="text-xl font-black text-gray-900 tracking-tight bg-transparent border-none cursor-pointer"
      >
        Blessed 7
      </button>

      {/* Links/botoes centrais */}
      <div className="flex items-center gap-10">
        {links.map(link => (
          <button
            key={link}
            onClick={() => {
              if (link === 'Início') rolarParaSecao('inicio');
              if (link === 'Procedimentos') rolarParaSecao('procedimentos');
              if (link === 'Sobre nós') rolarParaSecao('sobre-nos');
              if (link === 'Contato') rolarParaSecao('footer');
            }}
            className="text-sm bg-transparent border-none transition-colors text-gray-600 hover:text-[#2C3E2D] cursor-pointer font-semibold"
          >
            {link}
          </button>
        ))}
        <button
          onClick={aoClicarAgendar}
          className="text-sm font-bold text-[#2C3E2D] bg-transparent border-none cursor-pointer hover:text-[#1a2a1b] transition-colors"
        >
          Agende
        </button>
        <button onClick={aoClicarDashboard}
          className="text-sm font-bold text-[#2C3E2D] bg-transparent border-none cursor-pointer hover:text-[#1a2a1b] transition-colors">Dashboard</button>
      </div>

      {/* Área direita: usuário */}
      <div className="flex items-center gap-3">
        {usuario ? (
          <>
            <BalaoAgendamentos />
            <span className="text-sm text-gray-600">
              Olá, <strong>{primeiroNome}</strong>
            </span>
            <div onClick={()=>setClienteEditando(cliente)}className="w-9 h-9 rounded-full bg-[#8B7355] overflow-hidden flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" />
              </svg>
            </div>
            <button
              onClick={aoSair}
              className="text-sm font-semibold text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer transition-colors"
            >
              Sair
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-gray-900 hover:text-[#B8982A] transition-colors bg-transparent border-none cursor-pointer"
          >
            Entrar
          </button>
        )}
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
            onClick={() => navigate('/dashboard')}
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
        <ModalEdicao
          cliente={clienteEditando}
          onFechar={() => setClienteEditando(null)}
          onSalvar={handleSalvarEdicao}
          salvando={salvandoEdicao}
        />
      )}
    </nav>
    
  );
}
