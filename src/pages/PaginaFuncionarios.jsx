import React, { useState } from 'react';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';

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

/* ── cores para avatares ── */
const coresAvatar = ['bg-amber-400', 'bg-blue-400', 'bg-rose-400', 'bg-teal-400', 'bg-purple-400', 'bg-orange-400'];

const funcionariosIniciais = [
  { id: 1, nome: 'Carla Drummond',  email: 'carla.d@blessed7.com',   cpf: '321.654.987-00', status: 'ATIVO',   cor: 'bg-amber-400', iniciais: 'CD', cadastro: '03 Jan, 2024' },
  { id: 2, nome: 'Paulo Mendonça',  email: 'paulo.m@blessed7.com',   cpf: '741.852.963-11', status: 'ATIVO',   cor: 'bg-blue-400',  iniciais: 'PM', cadastro: '15 Fev, 2024' },
  { id: 3, nome: 'Fernanda Lima',   email: 'fernanda.l@blessed7.com', cpf: '159.753.486-22', status: 'INATIVO', cor: 'bg-rose-400',  iniciais: 'FL', cadastro: '07 Mar, 2024' },
];


const colunas = ['Funcionário', 'E-mail', 'CPF', 'Cadastro', 'Status', 'Ações'];

/* ── máscara CPF ── */
function mascaraCPF(v) {
  return v.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

/* ── KPI ── */
function KPI({ rotulo, valor, sub, destaque }) {
  return (
    <div className={`rounded-xl px-6 py-5 flex flex-col justify-between min-h-[110px] border ${
      destaque ? 'bg-[#2C3E2D] border-[#3a5c3b]' : 'bg-white border-[#e8e6d9]'
    }`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${destaque ? 'text-[#a8c5a0]' : 'text-gray-400'}`}>
        {rotulo}
      </p>
      <p className={`text-4xl font-black leading-none mt-2 ${destaque ? 'text-white' : 'text-gray-900'}`}>
        {valor}
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

const inputCls = "w-full px-4 py-2.5 bg-[#f5f4ec] border border-[#e8e6d9] rounded-lg text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#2C3E2D] focus:ring-1 focus:ring-[#2C3E2D]/20 transition-colors";

/* ══════════════════════════════════════════ */
export default function PaginaFuncionarios() {
  const [funcionarios, setFuncionarios]   = useState(funcionariosIniciais);
  const [mostrarSenha, setMostrarSenha]   = useState(false);
  const [menuAberto, setMenuAberto]       = useState(null);
  const [sucesso, setSucesso]             = useState(false);

  const [form, setForm] = useState({ nome: '', email: '', cpf: '', senha: '' });
  const [erros, setErros] = useState({});

  function handleForm(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: '' }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim())  e.nome  = 'Nome obrigatório';
    if (!form.email.includes('@')) e.email = 'E-mail inválido';
    if (form.cpf.length < 14)      e.cpf   = 'CPF incompleto';
    if (form.senha.length < 6)     e.senha = 'Mínimo 6 caracteres';
    return e;
  }

  function handleSubmit() {
    const e = validar();
    if (Object.keys(e).length) { setErros(e); return; }

    const iniciais = form.nome.trim().split(' ').slice(0, 2).map((p) => p[0].toUpperCase()).join('');
    const cor = coresAvatar[funcionarios.length % coresAvatar.length];
    const novo = {
      id: Date.now(),
      nome: form.nome.trim(),
      email: form.email.trim(),
      cpf: form.cpf,
      status: 'ATIVO',
      cor,
      iniciais,
      cadastro: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setFuncionarios((f) => [novo, ...f]);
    setForm({ nome: '', email: '', cpf: '', senha: '' });
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  }

  function toggleStatus(id) {
    setFuncionarios((f) =>
      f.map((func) => func.id === id
        ? { ...func, status: func.status === 'ATIVO' ? 'INATIVO' : 'ATIVO' }
        : func
      )
    );
    setMenuAberto(null);
  }

  function remover(id) {
    setFuncionarios((f) => f.filter((func) => func.id !== id));
    setMenuAberto(null);
  }

  const ativos   = funcionarios.filter((f) => f.status === 'ATIVO').length;
  const inativos = funcionarios.filter((f) => f.status === 'INATIVO').length;

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />

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

          {/* ── KPIs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <KPI rotulo="Total de Funcionários" valor={funcionarios.length} sub="Equipe completa" />
            <KPI rotulo="Funcionários Ativos"   valor={ativos}             sub="Operando agora" />
            <KPI rotulo="Inativos"              valor={inativos}           sub="Fora de operação" destaque />
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

            </div>

            {/* Senha — linha inteira */}
            <div className="mb-5">
              <Campo label="Senha de acesso">
                <div className="relative">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={form.senha}
                    onChange={(e) => handleForm('senha', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
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

            {/* botão + feedback */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#B8982A] hover:bg-[#a07f22] text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                {iconePlus} Cadastrar Funcionário
              </button>
              {sucesso && (
                <div className="flex items-center gap-2 text-[#2C3E2D] text-sm font-semibold animate-fade-in">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2C3E2D]">
                    {iconeCheck}
                  </span>
                  Funcionário cadastrado com sucesso!
                </div>
              )}
            </div>
          </div>

          {/* ── Tabela de funcionários */}
          <div className="bg-white border border-[#e8e6d9] rounded-xl overflow-hidden">
            {/* cabeçalho tabela */}
            <div className="grid grid-cols-[2fr_2.2fr_1.6fr_1.4fr_0.9fr_0.4fr] px-6 py-3 border-b border-[#f0eeea] bg-[#fafaf7]">
              {colunas.map((col) => (
                <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{col}</span>
              ))}
            </div>

            {funcionarios.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                Nenhum funcionário cadastrado ainda.
              </div>
            )}

            {funcionarios.map((f, i) => (
              <div
                key={f.id}
                className="grid grid-cols-[2fr_2.2fr_1.6fr_1.4fr_0.9fr_0.4fr] px-6 py-4 border-b border-[#f5f4f0] last:border-0 hover:bg-[#fafaf7] transition-colors items-center"
              >
                {/* funcionário */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${f.cor} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-bold text-white">{f.iniciais}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{f.nome}</p>
                    <p className="text-[10px] text-gray-400">ID {f.id.toString().slice(-5)}</p>
                  </div>
                </div>

                {/* e-mail */}
                <p className="text-xs text-gray-600 truncate pr-2">{f.email}</p>

                {/* cpf */}
                <p className="text-xs text-gray-600">{f.cpf}</p>

                {/* cadastro */}
                <p className="text-xs text-gray-500">{f.cadastro}</p>

                {/* status */}
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.status === 'ATIVO' ? 'bg-green-500' : 'bg-red-400'}`}/>
                  <span className={`text-xs font-semibold ${f.status === 'ATIVO' ? 'text-green-600' : 'text-red-500'}`}>
                    {f.status}
                  </span>
                </div>

                {/* ações */}
                <div className="relative">
                  <button
                    onClick={() => setMenuAberto(menuAberto === i ? null : i)}
                    className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {iconePonto}
                  </button>
                  {menuAberto === i && (
                    <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[140px]">
                      <button
                        onClick={() => toggleStatus(f.id)}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]"
                      >
                        {f.status === 'ATIVO' ? 'Desativar' : 'Reativar'}
                      </button>
                      <button
                        onClick={() => remover(f.id)}
                        className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* paginação */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-[#f0eeea]">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                Mostrando {funcionarios.length} funcionário{funcionarios.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D] transition-colors">
                  {iconeChevron('left')}
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2C3E2D] text-white text-xs font-bold">
                  1
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D] transition-colors">
                  {iconeChevron('right')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
