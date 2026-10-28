import { useState } from "react"
import { criarAgendamento } from "../services/agendamentoService";
import { toast } from "sonner";

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
        } catch (e) {
            const mensagem = e?.response?.data?.message || 'Não foi possível confirmar o agendamento. Tente novamente.';
            toast.error(mensagem);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return {loading, erro, sucesso, confirmar};
}