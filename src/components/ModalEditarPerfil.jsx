import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { formatarCpf } from '../utils/formatters';
import { removerMascara } from '../utils/masks';

const iconeEditar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const iconeFechar = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function Campo({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full rounded-lg border border-[#e8e6d9] bg-[#f5f4ec] px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#2C3E2D] focus:ring-1 focus:ring-[#2C3E2D]/20';
const inputDisabledCls = 'w-full rounded-lg border border-[#e8e6d9] bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed select-none';

export default function ModalEditarPerfil({ cliente, isFuncionario, onFechar, onSalvar, salvando }) {
  const [form, setForm] = useState(() => ({
    nome: cliente?.nome || '',
    email: cliente?.email || '',
    cpf: formatarCpf(cliente?.cpf || ''),
    dataNasc: cliente?.dataNasc || '',
    telefone: cliente?.telefone || '',
    urlFoto: cliente?.urlFoto || '',
  }));
  
  const [arquivoFoto, setArquivoFoto] = useState(null);
  const [erros, setErros] = useState({});

  useEffect(() => {
    const fecharComEscape = (event) => {
      if (event.key === 'Escape') onFechar();
    };
    document.addEventListener('keydown', fecharComEscape);
    return () => document.removeEventListener('keydown', fecharComEscape);
  }, [onFechar]);

  if (!cliente) return null;

  function handleForm(campo, valor) {
    const valorTratado = campo === 'cpf' ? formatarCpf(valor) : valor;

    setForm((atual) => ({ ...atual, [campo]: valorTratado }));
    setErros((atual) => ({ ...atual, [campo]: '' }));
  }

  function validar() {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = 'Nome obrigatório';
    if (!form.email.includes('@')) novosErros.email = 'E-mail inválido';
    
    if (!isFuncionario) {
      if (form.telefone && form.telefone.replace(/\D/g, '').length < 10) {
        novosErros.telefone = 'Telefone incompleto';
      }
    }
    return novosErros;
  }

  function realizarLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('user_role');
    localStorage.removeItem('nome_usuario');

    window.location.href = '/login';
  }

  function handleSubmit() {
    const novosErros = validar();
    if (Object.keys(novosErros).length) {
      setErros(novosErros);
      toast.error('Revise os campos destacados antes de salvar.');
      return;
    }

    const payload = {
      ...cliente,
      ...form,    
      cpf: form.cpf ? removerMascara(form.cpf) : cliente.cpf
    };

    const emailFoiAlterado = form.email.trim() !== cliente.email?.trim();

    onSalvar(cliente.id, payload, arquivoFoto)
      .then(() => {
        if (emailFoiAlterado) {
          toast.success('E-mail alterado com sucesso! Por segurança, faça login novamente para atualizar suas credenciais.');
          setTimeout(() => {
            realizarLogout();
          }, 2000);
        } else {
          toast.success('Perfil atualizado com sucesso.');
          onFechar();
        }
      })
      .catch((err) => {
        console.error("Erro capturado no catch do modal:", err);
        const mensagemApi = err?.response?.data?.message || 'Não foi possível salvar as alterações. Tente novamente.';
        toast.error(mensagemApi);
      });
  }

  function handleFotoUpload(event) {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    if (arquivo.type !== 'image/png' && arquivo.type !== 'image/jpeg') {
      toast.error('Apenas arquivos nos formatos PNG ou JPG são permitidos.');
      return;
    }

    setArquivoFoto(arquivo);
    const previewUrl = URL.createObjectURL(arquivo);
    handleForm('urlFoto', previewUrl);
  }

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
    >
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar modal de perfil"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f5f3] text-[#2D4336] transition hover:bg-[#e9efe9]"
        >
          {iconeFechar}
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef3ef] text-[#2C3E2D]">
            {iconeEditar}
          </div>
          <h2 className="mt-3 text-lg font-bold text-[#1d2e27]">Editar perfil</h2>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7b8d80]">
            {isFuncionario ? 'Dados do Funcionário' : 'Dados do Cliente'}
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[150px_1fr]">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#f7f6f1] p-4 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#e8d9a0] bg-[#dfe8df]">
              {form.urlFoto ? (
                <img
                  src={
                    form.urlFoto.startsWith('blob:') || form.urlFoto.startsWith('http')
                      ? form.urlFoto
                      : `http://localhost:8080${form.urlFoto.startsWith('/') ? '' : '/'}${form.urlFoto}`
                  }
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#2C3E2D]">
                  {form.nome?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <label className="cursor-pointer rounded-full bg-[#2D4336] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#23372b]">
              Alterar foto
              <input type="file" accept="image/png, image/jpeg" onChange={handleFotoUpload} className="hidden" />
            </label>
          </div>

          <div className="space-y-4 text-left">
            <Campo label="Nome completo">
              <input value={form.nome} onChange={(event) => handleForm('nome', event.target.value)} placeholder="Ex.: Patricia Ferreira" className={inputCls + (erros.nome ? ' border-red-400' : '')} />
              {erros.nome && <p className="text-[10px] text-red-500 mt-1">{erros.nome}</p>}
            </Campo>

            <Campo label="E-mail">
              <input type="email" value={form.email} onChange={(event) => handleForm('email', event.target.value)} placeholder="patricia@blessed7.com" className={inputCls + (erros.email ? ' border-red-400' : '')} />
              {erros.email && <p className="text-[10px] text-red-500 mt-1">{erros.email}</p>}
            </Campo>

            <Campo label="CPF">
              <input
                type="text"
                value={form.cpf}
                onChange={(event) => handleForm('cpf', event.target.value)}
                maxLength={14}
                placeholder="000.000.000-00"
                className={isFuncionario ? inputDisabledCls : inputCls}
                readOnly={isFuncionario}
              />
            </Campo>

            {!isFuncionario && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Campo label="Telefone">
                  <input type="text" value={form.telefone} onChange={(event) => handleForm('telefone', event.target.value)} placeholder="(11) 98765-4321" className={inputCls + (erros.telefone ? ' border-red-400' : '')} />
                  {erros.telefone && <p className="text-[10px] text-red-500 mt-1">{erros.telefone}</p>}
                </Campo>
                <Campo label="Data de Nascimento">
                  <input type="date" value={form.dataNasc} onChange={(event) => handleForm('dataNasc', event.target.value)} className={inputCls} />
                </Campo>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onFechar} className="flex-1 rounded-xl border border-[#e8e6d9] px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-[#f5f4ec]">Cancelar</button>
          <button type="button" onClick={handleSubmit} disabled={salvando} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2C3E2D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#243325] disabled:cursor-not-allowed disabled:opacity-70">
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}