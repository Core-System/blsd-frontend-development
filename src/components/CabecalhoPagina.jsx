import { useAuth } from '../contexts/AuthContext';

export default function CabecalhoPagina() {
  const { usuario } = useAuth();
  const primeiroNome = usuario?.nome?.split(' ')[0] || '';

  return (
    <div className="text-center py-14 px-6">
      <h1 className="text-5xl font-bold text-[#2C3E2D] mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
        Agende sua Transformação
      </h1>
      <p className="text-gray-500 text-base max-w-xs mx-auto leading-relaxed">
        Reserve o seu momento de cuidado em um ambiente projetado para sua excelência estética.
      </p>
    </div>
  );
}