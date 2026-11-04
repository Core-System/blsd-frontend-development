import BarraDeNavegacaoSuperior from './BarraDeNavegacaoSuperior';
import Rodape from './Rodape';

export default function ShellPublico({ children, className = '' }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAE8]">
      <BarraDeNavegacaoSuperior />
      <main className={`flex-1 w-full ${className}`}>
        {children}
      </main>
      <Rodape />
    </div>
  );
}
