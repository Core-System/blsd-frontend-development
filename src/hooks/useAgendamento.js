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
            if (e.response?.status === 400) {
                setErro('Este horário já está reservado. Por favor, escolha outro.');
            } else {
                setErro('Ocorreu um erro ao processar seu agendamento. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, erro, sucesso, confirmar};
}