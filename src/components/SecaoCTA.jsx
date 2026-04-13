export default function SecaoCTA() {
  return (
    <section className="bg-[#FAFAE8] px-16 py-16 border-t border-gray-200 flex items-center justify-between">
      <div>
        <h2 className="font-lora font-bold text-[#333] text-4xl mb-4">Ainda tem dúvidas?</h2>
        <p className="font-montserrat font-bold text-sm text-[#555] leading-relaxed">
          Acesse o chatbot e pergunte o que quiser saber!<br />
          Entre em contato e descubra mais sobre o universo Blessed 7.
        </p>
      </div>
      <button className="bg-[#C5A859] hover:bg-[#b5994f] text-white text-xs font-bold uppercase tracking-[0.15em] px-10 py-5 rounded shadow-md transition-all font-montserrat">
        Falar com Chatbot
      </button>
    </section>
  );
}