import BarraDeNavegacaoSuperior from './BarraDeNavegacaoSuperior'
import Rodape from './Rodape'

export default function LayoutPrincipal({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAE8]">
      <BarraDeNavegacaoSuperior />
      <main className="flex-1">
        {children}
      </main>
      <Rodape />
    </div>
  )
}
