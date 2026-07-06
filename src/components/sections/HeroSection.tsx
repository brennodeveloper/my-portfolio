import Image from "next/image";

export function HeroSection() {
  return (
    <section className="min-h-screen">
      <div className="w-full max-w-[700px] h-[540px] perspective-[1000px] group">
        
        <div className="relative w-full h-full transition-transform duration-1000 transform-3d group-hover:rotate-y-180 will-change-transform">
          
          <div className="absolute inset-0 w-full h-full backface-hidden pointer-events-none">
            <Image src="/perfil.png" alt="Foto" fill className="object-cover rounded-xl" sizes="700px" priority />
          </div>

          <div className="sm:text-xs md:text-sm lg:text-base absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl p-2 bg-blue-950/10 backdrop-blur-md border border-blue-950/20">
            <h2 className="text-2xl font-bold text-cyan-300">
              Sobre mim <hr/>
            </h2>
            <div className="p-2 space-y-6"> 
              <p>
                Atualmente curso <strong className="text-cyan-300">ADS</strong> e atuo como <strong className="text-cyan-300">desenvolvedor web freelancer</strong>,
                com foco no desenvolvimento front-end. Gosto de criar sites modernos, 
                landing pages e sistemas completos, buscando unir performance, usabilidade
                e uma interface bem construída. 
              </p>
              <p>
                Embora meu foco principal seja o front-end, venho me aprofundando
                no back-end para poder ampliar minha visão sobre arquitetura de
                software e desenvolver aplicações cada vez mais completas e eficientes.
              </p>
              <p>
                Acredito que um bom produto nasce do equilíbrio entre estética e 
                funcionalidade. Mais do que escrever código, gosto de transformar 
                ideias em experiências intuitivas, agradáveis de usar e com identidade 
                própria. Essa forma de desenvolvimento está presente em cada projeto 
                que construo, como: <a href="#">project-x</a>, <a href="#">project-y</a> e <a href="#">project-z</a>.
              </p>
              <p>
                Fora da programação, gosto de aproveitar o tempo com minha namorada, 
                jogar vôlei ou xadrez, fazer crochê, descobrir novas cafeterias e
                mergulhar na leitura de um bom livro
              </p>
            </div> 
          </div>
        </div>
      </div>
    </section>
  );
}