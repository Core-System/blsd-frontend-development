import { useState } from "react"
import axios from "axios";
import { criarAgendamento } from "../services/agendamentoService";

export function useAgendamento(){
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [sucesso, setSucesso] = useState(null);

    async function confirmar(dados) {
        setErro(null);
        setLoading(true);

        try {
            await criarAgendamento(dados);
            setSucesso(dados);
        } catch(e){
            console.warn('API indisponível; usando confirmação local de demonstração.', e);
            setSucesso({
                ...dados,
                status: 'ok',
                modo: 'fallback',
            });
        } finally {
            setLoading(false);
        }
    }

    return {loading, erro, sucesso, confirmar};
}