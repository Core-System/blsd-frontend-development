import LayoutPrincipal from '../components/LayoutPrincipal'
import SecaoPrincipal from '../components/SecaoPrincipal'
import SecaoProcedimentos from '../components/SecaoProcedimentos'
import SecaoDepoimentos from '../components/SecaoDepoimentos'
import SecaoCTA from '../components/SecaoCTA'
import SobreNos from '../components/SobreNos'
// import { useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import api from '../services/api'

export default function PaginaInicial() {
  return (
    <LayoutPrincipal>
      <SecaoPrincipal />
      <SecaoProcedimentos />
      <SecaoDepoimentos />
      <SecaoCTA/>
      <SobreNos/>
    </LayoutPrincipal>
  )
}