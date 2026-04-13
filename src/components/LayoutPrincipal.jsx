import BarraDeNavegacao from './BarraDeNavegacao'
import Rodape from './Rodape'

export default function LayoutPrincipal({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAE8] font-montserrat">
      <BarraDeNavegacao />
      <main className="flex-1">
        {children}
      </main>
      <Rodape />
    </div>
  )
}