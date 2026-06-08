export default function SecaoSobreNos() {
  return (
    <section id="sobre-nos" className="bg-[#FAFAE8] py-12 px-8">
      <div className="grid grid-cols-[1fr_3fr] gap-0 min-h-[480px] rounded-2xl overflow-hidden shadow-sm">

        {/* Coluna esquerda — verde decorativa */}
        <div className="bg-[#4A6741]" />

        {/* Coluna direita — fundo claro com texto */}
        <div className="bg-white flex flex-col justify-center px-16 py-14">
          <h2 className="font-lora text-3xl font-bold text-[#333] mb-2">Sobre a Blessed 7</h2>
          <p className="font-montserrat font-bold text-sm text-[#666] mb-8">Conheça nossa história e propósito</p>

          <p className="font-montserrat text-sm text-[#555] leading-relaxed mb-6">
            Desde 2018, a <strong className="text-[#333]">Blessed 7</strong> tem sido sinônimo de excelência e cuidado no universo da estética. Nascemos da paixão por transformar bem-estar em experiências únicas, oferecendo procedimentos de alta qualidade com a atenção e o carinho que cada cliente merece.  
             
          </p>

          <p className="font-montserrat text-sm text-[#555] leading-relaxed mb-6">
            <strong className="text-[#333]">    Fernanda Ancila Chiazza Alvim</strong> construiu sua trajetória profissional a partir de escolhas corajosas e uma capacidade notável de se reinventar. Antes de chegar à estética, trilhou um caminho sólido na área da saúde: formada em enfermagem, acumulou cinco anos de experiência na supervisão hospitalar, sua última passagem pelo ambiente clínico tradicional. 
             </p>

        <p className="font-montserrat text-sm text-[#555] leading-relaxed mb-6">
           A virada veio com a maternidade. Com o nascimento de Alice, Fernanda se viu diante de um dilema que muitas mães conhecem bem — deixar a filha na creche e perceber que aquilo simplesmente não funcionava para elas. Sem apoio suficiente e com o coração partido a cada despedida, tomou a decisão de abrir mão da carreira hospitalar para estar presente na criação da filha. Foi nesse intervalo que encontrou um novo propósito: fez uma pós-graduação em estética e abriu um novo capítulo. 

Trabalhou por dois anos em uma clínica próxima de casa, onde ganhou experiência no setor. Mas o espírito empreendedor falou mais alto. Saiu da clínica e começou a atender no quarto da própria mãe — um começo humilde que, longe de ser motivo de vergonha, foi o embrião do que viria a seguir. 

Foi desse quarto que surgiu a oportunidade de alugar um pequeno espaço que funcionava antes como bar. Sem dinheiro para reforma, Fernanda foi literalmente na cara e na coragem. Chegou ao local e encontrou tudo destruído. A cozinha do antigo bar virou seu espaço de atendimento — separada apenas por uma porta instalada na hora. Com as próprias mãos lavou cada azulejo, rejuntou as paredes e pintou o chão. 

E foi exatamente assim, sem glamour e sem atalhos, que a Blessed 7 nasceu. O que era uma cozinha de bar virou um refúgio de cuidado e beleza. O que era falta de dinheiro virou prova de determinação. E o que começou como uma escolha pela filha, tornou-se uma história de uma mulher que construiu, com as próprias mãos, o lugar onde outros encontram leveza. Fernanda não apenas chegou à estética — ela criou o seu próprio espaço nela. 
          </p>

          <p className="font-montserrat text-sm text-[#555] leading-relaxed mb-6">
            Nossa equipe é formada por profissionais altamente qualificados, comprometidos em proporcionar resultados reais e duradouros. Utilizamos tecnologia de ponta e produtos cuidadosamente selecionados para garantir a segurança, o conforto e a satisfação em cada visita.
          </p>
          <p className="font-montserrat text-sm text-[#555] leading-relaxed">
            Mais do que uma clínica estética, somos um espaço de acolhimento e renovação. Acreditamos que cuidar da aparência é também cuidar da autoestima — e é com esse propósito que recebemos cada cliente como parte da nossa família.
          </p>

          {/* <div className="mt-10 pt-8 border-t border-gray-100 flex gap-12">
            <div>
              <span className="font-lora text-3xl font-bold text-[#4A6741]">+500</span>
              <p className="font-montserrat text-xs text-[#888] mt-1 uppercase tracking-wider">Clientes atendidos</p>
            </div>
            <div>
              <span className="font-lora text-3xl font-bold text-[#4A6741]">7+</span>
              <p className="font-montserrat text-xs text-[#888] mt-1 uppercase tracking-wider">Anos de experiência</p>
            </div>
            <div>
              <span className="font-lora text-3xl font-bold text-[#4A6741]">15+</span>
              <p className="font-montserrat text-xs text-[#888] mt-1 uppercase tracking-wider">Procedimentos</p>
            </div>
          </div> */}
        </div>

      </div>
    </section>
  );
}