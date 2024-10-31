//ANIMAÇÃO AO CARREGAR A PAGINA
    const elementos = document.querySelectorAll('.refresh-animate');
    function animarElementos() {
        elementos.forEach(elemento => {
            // Adiciona a classe de animação
            elemento.classList.add('animar');
        });
    }

    window.addEventListener('load', animarElementos);

//ANIMAÇÃO DE SCROLL COM GSAP    
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.elemento').forEach((element, index) => {
        gsap.fromTo(element, 
            { 
                opacity: 0, 
                y: 20 
            }, 
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: element, // Cada elemento é o trigger
                    start: 'top 80%', // Inicia a animação quando o topo do elemento atinge 75% da tela
                    toggleActions: 'play none none reverse', // Executa a animação para frente e para trás
                }
            }
        );
    });

    