import LayoutPrincipal from '../components/LayoutPrincipal'
import SecaoPrincipal from '../components/SecaoPrincipal'
import SecaoProcedimentos from '../components/SecaoProcedimentos'
import SecaoDepoimentos from '../components/SecaoDepoimentos'
import SecaoCTA from '../components/SecaoCTA'

export default function PaginaInicial() {
  return (
    <LayoutPrincipal>
      <SecaoPrincipal />
      <SecaoProcedimentos />
      <SecaoDepoimentos />
      <SecaoCTA />
    </LayoutPrincipal>
  )
}