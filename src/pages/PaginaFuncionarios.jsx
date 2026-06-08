import React, { useState, useEffect, useCallback } from 'react';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import {
  listarFuncionarios,
  cadastrarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
} from '../services/funcionarioService';

/* ── ícones ── */
const iconePlus = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const iconeOlho = (aberto) => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {aberto
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
    }
  </svg>
);
const iconeChevron = (dir) => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    {dir === 'left' ? <polyline points="15 18 9 12 15 6"/> : <polyline points="9 18 15 12 9 6"/>}
  </svg>
);
const iconePonto = (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);
const iconeCheck = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const iconeUsuario = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="8" r="4"/><path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
  </svg>
);
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
const iconeAviso = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

/* ── Avatar neutro ── */
function AvatarNeutro({ tamanho = 36 }) {
  return (
    <div
      className="rounded-full bg-[#e8e6d9] flex items-center justify-center flex-shrink-0"
      style={{ width: tamanho, height: tamanho, minWidth: tamanho }}
    >
      <svg width={tamanho * 0.55} height={tamanho * 0.55} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.8}>
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
      </svg>
    </div>
  );
}

function formatarData(dataISO) {
  if (!dataISO) return '—';
  try {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch {
    return '—';
  }
}

/* ── máscara CPF ── */
function mascaraCPF(v) {
  return v.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

/* ── KPI ── */
function KPI({ rotulo, valor, sub, destaque, carregando }) {
  return (
    <div className={`rounded-xl px-6 py-5 flex flex-col justify-between min-h-[110px] border ${
      destaque ? 'bg-[#2C3E2D] border-[#3a5c3b]' : 'bg-white border-[#e8e6d9]'
    }`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${destaque ? 'text-[#a8c5a0]' : 'text-gray-400'}`}>
        {rotulo}
      </p>
      <p className={`text-4xl font-black leading-none mt-2 ${destaque ? 'text-white' : 'text-gray-900'}`}>
        {carregando ? '—' : valor}
      </p>
      {sub && (
        <p className={`text-[11px] font-semibold mt-2 ${destaque ? 'text-[#a8c5a0]' : 'text-[#2C3E2D]'}`}>{sub}</p>
      )}
    </div>
  );
}

/* ── campo de formulário ── */
function Campo({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-4 py-2.5 bg-[#f5f4ec] border border-[#e8e6d9] rounded-lg text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#2C3E2D] focus:ring-1 focus:ring-[#2C3E2D]/20 transition-colors';

/* ── Modal de edição ── */
function ModalEdicao({ funcionario, onFechar, onSalvar, salvando }) {
  const [form, setForm] = useState({
    nome: funcionario.nome || '',
    email: funcionario.email || '',
    cpf: funcionario.cpf || '',
    senha: '',
  });
  const [erros, setErros] = useState({});
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleForm(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Nome obrigatório';
    if (!form.email.includes('@')) e.email = 'E-mail inválido';
    if (form.cpf.length < 14) e.cpf = 'CPF incompleto';
    if (form.senha && form.senha.length < 8) e.senha = 'Mínimo 8 caracteres';
    return e;
  }

  function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length) { setErros(e); return; }
    onSalvar(funcionario.id, form);
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
              <h2 className="text-base font-bold text-gray-900">Editar Funcionário</h2>
              <p className="text-[11px] text-gray-400">Atualize os dados do colaborador</p>
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
              placeholder="Ex.: Ana Paula Souza"
              className={inputCls + (erros.nome ? ' border-red-400' : '')}
            />
            {erros.nome && <p className="text-[10px] text-red-500">{erros.nome}</p>}
          </Campo>

          <Campo label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleForm('email', e.target.value)}
              placeholder="funcionario@blessed7.com"
              className={inputCls + (erros.email ? ' border-red-400' : '')}
            />
            {erros.email && <p className="text-[10px] text-red-500">{erros.email}</p>}
          </Campo>

          <Campo label="CPF">
            <input
              value={form.cpf}
              onChange={(e) => handleForm('cpf', mascaraCPF(e.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              className={inputCls + (erros.cpf ? ' border-red-400' : '')}
            />
            {erros.cpf && <p className="text-[10px] text-red-500">{erros.cpf}</p>}
          </Campo>

          <Campo label="Nova senha (deixe vazio para não alterar)">
            <div className="relative">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={form.senha}
                onChange={(e) => handleForm('senha', e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className={inputCls + ' pr-10' + (erros.senha ? ' border-red-400' : '')}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {iconeOlho(mostrarSenha)}
              </button>
            </div>
            {erros.senha && <p className="text-[10px] text-red-500">{erros.senha}</p>}
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

/* ── Modal de confirmação de remoção ── */
function ModalConfirmacao({ nome, onConfirmar, onCancelar, removendo }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[#e8e6d9] shadow-2xl w-full max-w-sm mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            {iconeAviso}
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Remover funcionário</h2>
            <p className="text-[11px] text-gray-400">Esta ação não pode ser desfeita</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Tem certeza que deseja remover <strong>{nome}</strong>? O acesso será encerrado permanentemente.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 px-4 py-2.5 border border-[#e8e6d9] text-gray-600 text-sm font-semibold rounded-lg hover:bg-[#f5f4ec] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={removendo}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-60"
          >
            {removendo ? 'Removendo...' : 'Confirmar remoção'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════ */
const ITENS_POR_PAGINA = 10;
const colunas = ['Funcionário', 'E-mail', 'CPF', 'Nível de Acesso', 'Ações'];

export default function PaginaFuncionarios() {
  const [funcionarios, setFuncionarios]     = useState([]);
  const [carregando, setCarregando]         = useState(true);
  const [erroApi, setErroApi]               = useState(null);

  // cadastro
  const [mostrarSenha, setMostrarSenha]     = useState(false);
  const [salvando, setSalvando]             = useState(false);
  const [sucesso, setSucesso]               = useState(false);
  const [erroForm, setErroForm]             = useState(null);
  const [form, setForm]                     = useState({ nome: '', email: '', cpf: '', senha: '' });
  const [erros, setErros]                   = useState({});

  // paginação
  const [pagina, setPagina]                 = useState(1);

  // menu de ações
  const [menuAberto, setMenuAberto]         = useState(null);

  // modal de edição
  const [funcEditando, setFuncEditando]     = useState(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  // modal de remoção
  const [funcRemovendo, setFuncRemovendo]   = useState(null);
  const [removendo, setRemovendo]           = useState(false);
  const [mensagemSucessoEdicao, setMensagemSucessoEdicao] = useState(false);

  /* ── carregar ── */
  const carregar = useCallback(async () => {
    setCarregando(true);
    setErroApi(null);
    try {
      const data = await listarFuncionarios();
      setFuncionarios(data);
    } catch (e) {
      console.error('Erro ao carregar funcionários:', e);
      setErroApi('Não foi possível carregar os funcionários. Verifique a conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  /* ── form helpers ── */
  function handleForm(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
    setErroForm(null);
  }

  function validar() {
    const e = {};
    if (!form.nome.trim())             e.nome  = 'Nome obrigatório';
    if (!form.email.includes('@'))     e.email = 'E-mail inválido';
    if (form.cpf.length < 14)          e.cpf   = 'CPF incompleto';
    if (form.senha.length < 8)         e.senha = 'Mínimo 8 caracteres';
    return e;
  }

  async function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length) { setErros(e); return; }

    setSalvando(true);
    setErroForm(null);
    try {
      await cadastrarFuncionario({
        nome: form.nome.trim(),
        email: form.email.trim(),
        cpf: form.cpf,
        senha: form.senha,
      });
      await carregar();
      setForm({ nome: '', email: '', cpf: '', senha: '' });
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.response?.data || 'Erro ao cadastrar funcionário.';
      setErroForm(typeof msg === 'string' ? msg : 'Erro ao cadastrar funcionário.');
    } finally {
      setSalvando(false);
    }
  }

  /* ── editar ── */
  async function handleSalvarEdicao(id, dados) {
    setSalvandoEdicao(true);
    try {
      // se senha vazia, usa placeholder pois backend exige — idealmente o backend aceitaria sem campo senha para update
      const payload = {
        nome: dados.nome,
        email: dados.email,
        cpf: dados.cpf,
        senha: dados.senha || undefined,
      };
      await atualizarFuncionario(id, payload);
      await carregar();
      setFuncEditando(null);
      setMensagemSucessoEdicao(true);
      setTimeout(() => setMensagemSucessoEdicao(false), 4000);
    } catch (e) {
      console.error('Erro ao atualizar:', e);
      alert('Erro ao atualizar funcionário. Tente novamente.');
    } finally {
      setSalvandoEdicao(false);
    }
  }

  /* ── remover ── */
  async function handleConfirmarRemocao() {
    setRemovendo(true);
    try {
      await deletarFuncionario(funcRemovendo.id);
      await carregar();
      setFuncRemovendo(null);
    } catch (e) {
      console.error('Erro ao remover:', e);
      alert('Erro ao remover funcionário. Tente novamente.');
    } finally {
      setRemovendo(false);
    }
  }

  /* ── paginação ── */
  const totalPaginas = Math.max(1, Math.ceil(funcionarios.length / ITENS_POR_PAGINA));
  const paginaAtual  = Math.min(pagina, totalPaginas);
  const fatia = funcionarios.slice((paginaAtual - 1) * ITENS_POR_PAGINA, paginaAtual * ITENS_POR_PAGINA);

  /* ── KPIs ── */
  const totalFuncionarios = funcionarios.length;

  function getNivelAcesso(f) {
    return f?.acesso?.nome ?? 'FUNCIONARIO';
  }

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans" onClick={() => setMenuAberto(null)}>
      <BarraDeNavegacaoLateral />

      {funcEditando && (
        <ModalEdicao
          funcionario={funcEditando}
          onFechar={() => setFuncEditando(null)}
          onSalvar={handleSalvarEdicao}
          salvando={salvandoEdicao}
        />
      )}

      {funcRemovendo && (
        <ModalConfirmacao
          nome={funcRemovendo.nome}
          onConfirmar={handleConfirmarRemocao}
          onCancelar={() => setFuncRemovendo(null)}
          removendo={removendo}
        />
      )}

      <main className="ml-[152px] min-h-screen bg-[#f5f4ec]">
        <div className="max-w-[1200px] mx-auto px-6 py-7">

          {/* ── Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Gestão <span className="mx-1.5 text-gray-300">›</span>
                <span className="text-[#2C3E2D]">Funcionários</span>
              </p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Gestão de Funcionários</h1>
              <p className="text-sm text-gray-400 mt-1">Cadastre e gerencie a equipe da clínica.</p>
            </div>
          </div>

          {/* ── Erro de API ── */}
          {erroApi && (
            <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700">
              <span className="flex-shrink-0">{iconeAviso}</span>
              <span>{erroApi}</span>
              <button onClick={carregar} className="ml-auto text-xs font-bold underline hover:no-underline">
                Tentar novamente
              </button>
            </div>
          )}

          {/* ── KPIs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <KPI rotulo="Total de Funcionários" valor={totalFuncionarios} sub="Equipe completa" carregando={carregando} />
            <KPI rotulo="Nível de Acesso Padrão" valor="FUNC" sub="Perfil funcionário" carregando={carregando} />
            <KPI rotulo="Cadastros" valor={totalFuncionarios} sub="Registros ativos" destaque carregando={carregando} />
          </div>

          {/* ── Formulário de cadastro */}
          <div className="bg-white border border-[#e8e6d9] rounded-xl p-6 mb-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#f0f5f0] flex items-center justify-center text-[#2C3E2D]">
                {iconeUsuario}
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Novo Funcionário</h2>
                <p className="text-[11px] text-gray-400">Preencha os dados para criar o acesso</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Nome */}
              <Campo label="Nome completo">
                <input
                  value={form.nome}
                  onChange={(e) => handleForm('nome', e.target.value)}
                  placeholder="Ex.: Ana Paula Souza"
                  className={inputCls + (erros.nome ? ' border-red-400' : '')}
                />
                {erros.nome && <p className="text-[10px] text-red-500">{erros.nome}</p>}
              </Campo>

              {/* E-mail */}
              <Campo label="E-mail">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleForm('email', e.target.value)}
                  placeholder="funcionario@blessed7.com"
                  className={inputCls + (erros.email ? ' border-red-400' : '')}
                />
                {erros.email && <p className="text-[10px] text-red-500">{erros.email}</p>}
              </Campo>

              {/* CPF */}
              <Campo label="CPF">
                <input
                  value={form.cpf}
                  onChange={(e) => handleForm('cpf', mascaraCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={inputCls + (erros.cpf ? ' border-red-400' : '')}
                />
                {erros.cpf && <p className="text-[10px] text-red-500">{erros.cpf}</p>}
              </Campo>

              {/* Senha */}
              <Campo label="Senha de acesso">
                <div className="relative">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={form.senha}
                    onChange={(e) => handleForm('senha', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className={inputCls + ' pr-10' + (erros.senha ? ' border-red-400' : '')}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {iconeOlho(mostrarSenha)}
                  </button>
                </div>
                {erros.senha && <p className="text-[10px] text-red-500">{erros.senha}</p>}
              </Campo>
            </div>

            {/* botão + feedbacks */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleSubmit}
                disabled={salvando}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#B8982A] hover:bg-[#a07f22] text-white text-sm font-bold rounded-lg transition-colors shadow-sm disabled:opacity-60"
              >
                {iconePlus} {salvando ? 'Cadastrando...' : 'Cadastrar Funcionário'}
              </button>
              {sucesso && (
                <div className="flex items-center gap-2 text-[#2C3E2D] text-sm font-semibold">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2C3E2D]">
                    {iconeCheck}
                  </span>
                  Funcionário cadastrado com sucesso!
                </div>
              )}
              {erroForm && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
                  <span>{iconeAviso}</span>
                  {erroForm}
                </div>
              )}
            </div>
          </div>

          {/* ── Tabela de funcionários */}
          <div className="bg-white border border-[#e8e6d9] rounded-xl overflow-hidden">
            {/* cabeçalho tabela */}
            <div className="grid grid-cols-[2fr_2.2fr_1.6fr_1.4fr_1.2fr_0.4fr] px-6 py-3 border-b border-[#f0eeea] bg-[#fafaf7]">
              {colunas.map((col) => (
                <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{col}</span>
              ))}
            </div>
            
            {mensagemSucessoEdicao && (
  <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C3E2D] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium animate-fade-in">
    {/* Ícone de Check/Sucesso */}
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a8c5a0" strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
    <span>Funcionário atualizado com sucesso!</span>
  </div>
)}

            {/* estado de carregamento */}
            {carregando && (
              <div className="py-12 text-center text-gray-400 text-sm">
                Carregando funcionários...
              </div>
            )}

            {/* sem dados */}
            {!carregando && funcionarios.length === 0 && !erroApi && (
              <div className="py-12 text-center text-gray-400 text-sm">
                Nenhum funcionário cadastrado ainda.
              </div>
            )}

            {/* linhas */}
            {!carregando && fatia.map((f, i) => {
              const idxGlobal = (paginaAtual - 1) * ITENS_POR_PAGINA + i;
              const nivelAcesso = getNivelAcesso(f);

              return (
                <div
                  key={f.id}
                  className="grid grid-cols-[2fr_2.2fr_1.6fr_1.4fr_1.2fr_0.4fr] px-6 py-4 border-b border-[#f5f4f0] last:border-0 hover:bg-[#fafaf7] transition-colors items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* funcionário */}
                  <div className="flex items-center gap-3">
                    <AvatarNeutro tamanho={36} />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{f.nome}</p>
                      <p className="text-[10px] text-gray-400">ID #{f.id}</p>
                    </div>
                  </div>

                  {/* e-mail */}
                  <p className="text-xs text-gray-600 truncate pr-2">{f.email}</p>

                  {/* cpf */}
                  <p className="text-xs text-gray-600">{f.cpf || '—'}</p>

                  {/* nível acesso */}
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      nivelAcesso === 'GESTOR'
                        ? 'bg-amber-100 text-amber-700'
                        : nivelAcesso === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-[#f0f5f0] text-[#2C3E2D]'
                    }`}>
                      {nivelAcesso}
                    </span>
                  </div>

                  {/* ações */}
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setMenuAberto(menuAberto === idxGlobal ? null : idxGlobal)}
                      className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {iconePonto}
                    </button>
                    {menuAberto === idxGlobal && (
                      <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[140px]">
                        <button
                          onClick={() => { setFuncEditando(f); setMenuAberto(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec] flex items-center gap-2"
                        >
                          {iconeEditar} Editar
                        </button>
                        <button
                          onClick={() => { setFuncRemovendo(f); setMenuAberto(null); }}
                          className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                        >
                          Remover
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* paginação */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-[#f0eeea]">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                Mostrando {fatia.length} de {funcionarios.length} funcionário{funcionarios.length !== 1 ? 's' : ''}
              </p>
              {totalPaginas > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPagina((p) => Math.max(1, p - 1))}
                    disabled={paginaAtual === 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D] transition-colors disabled:opacity-40"
                  >
                    {iconeChevron('left')}
                  </button>
                  {Array.from({ length: totalPaginas }, (_, idx) => idx + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPagina(n)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                        n === paginaAtual
                          ? 'bg-[#2C3E2D] text-white'
                          : 'border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                    disabled={paginaAtual === totalPaginas}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D] transition-colors disabled:opacity-40"
                  >
                    {iconeChevron('right')}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
