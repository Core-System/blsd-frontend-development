import LayoutPrincipal from '../components/LayoutPrincipal'
import SecaoPrincipal from '../components/SecaoPrincipal'
import SecaoProcedimentos from '../components/SecaoProcedimentos'
import SecaoDepoimentos from '../components/SecaoDepoimentos'
import SecaoCTA from '../components/SecaoCTA'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../services/api'

export default function PaginaInicial() {

  const [searchParams, setSearchParams ] = useSearchParams();

  useEffect(()=>{
    const codeAgendamento = searchParams.get('code');

    if(codeAgendamento){

    async function validarLinkAgendamento(){
      const response = await api.post('/usuario/link-agendamento', null,{
        params: {code: codeAgendamento}
      });

      const {token} = response.data;

      localStorage.setItem('token', token)
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    validarLinkAgendamento();
    }
  }, []);



  return (
    <LayoutPrincipal>
      <SecaoPrincipal />
      <SecaoProcedimentos />
      <SecaoDepoimentos />
      <SecaoCTA />
    </LayoutPrincipal>
  )
}