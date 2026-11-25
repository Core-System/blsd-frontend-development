import { useAuth } from '../contexts/AuthContext';

export default function CabecalhoPagina() {
  const { usuario } = useAuth();
  const primeiroNome = usuario?.nome?.split(' ')[0] || '';

  return (
    <div className="px-4 py-10 text-center sm:px-6 sm:py-14">
      <h1 className="mb-4 text-3xl font-bold leading-tight text-[#2C3E2D] sm:text-5xl" style={{ fontFamily: 'Georgia, serif' }}>
        Agende sua Transformação
      </h1>
      <p className="text-gray-500 text-base max-w-xs mx-auto leading-relaxed">
        Reserve o seu momento de cuidado em um ambiente projetado para sua excelência estética.
      </p>
    </div>
  );
}