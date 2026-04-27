import BarraDeNavegacao from "../components/BarraDeNavegacao";
import CartaoDeCadastro from "../components/CartaoDeCadastro";
import Rodape from "../components/Rodape";
import { cadastrarCliente } from "../services/ClienteService";
import imagemFundo from "../assets/fundoLogin.png"; 

export default function PaginaDeCadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    dataNasc: "",
    telefone: "",
    urlFoto: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clienteCriado = await cadastrarCliente(form);
      alert("Cadastro realizado com sucesso: " + clienteCriado.nome);
    } catch {
      alert("Erro ao cadastrar cliente");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <div className="relative flex-1">

        <img
          src={imagemFundo}
          alt="Interior do salão Blessed 7"
          className="w-full h-full object-cover absolute inset-0"
        />


        <div className="relative z-10 flex flex-col h-full">


          <BarraDeNavegacao />

          <div className="flex-1 flex items-center justify-center py-10">
            <CartaoDeCadastro />
          </div>

        </div>
      </div>

      <Rodape />

    </div>
  );
}