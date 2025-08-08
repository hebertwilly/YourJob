const page = document.title;

if(page === 'YourJob | Empresas'){
    const buttonEmpresa = document.getElementById('empresa');

    buttonEmpresa.style.color = "#FFFFFF";
    buttonEmpresa.style.backgroundColor = "#004AAD";
}

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

// ANIMAÇÃO TROCA DE CARDS    
    const cards = [
        {
            id: "card1",
            imgSrc: "../../assets/icons/Crown.svg",
            title: "Lider de Mercado",
            description: "A YourJob é a maior especialista no mercado de RH oferecendo um serviço ágil e de qualidade."
        },
        {
            id: "card2",
            imgSrc: "../../assets/icons/Target.svg",
            title: "Centralização",
            description: "A YourJob oferece centralização de processos, facilitando a gestão de recursos humanos."
        },
        {
            id: "card3",
            imgSrc: "../../assets/icons/MapPinSimpleArea.svg",
            title: "Jornada Única",
            description: "A YourJob garante uma jornada única de contratação, simplificando cada etapa do processo."
        }
    ];

    function trocarConteudo() {
        cards.forEach((card, i) => {
            const elemento = document.getElementById(card.id);
            
            setTimeout(() => {
                // Suaviza a transição de saída
                gsap.to(elemento, { 
                    opacity: 0.5, 
                    duration: 0.2, 
                    onComplete: () => {
                        elemento.innerHTML = ""; // Limpa o conteúdo atual
                        elemento.classList.add("background-black"); // Altera a cor de fundo
    
                        // Cria a estrutura do novo conteúdo
                        const headerDiv = document.createElement("div");
                        headerDiv.classList.add("header-card-section-4");
    
                        const img = document.createElement("img");
                        img.src = card.imgSrc;
                        img.alt = card.title;
    
                        const spanTitle = document.createElement("span");
                        spanTitle.classList.add("text-title");
                        spanTitle.textContent = card.title;
    
                        const spanDescription = document.createElement("span");
                        spanDescription.classList.add("description");
                        spanDescription.textContent = card.description;
    
                        // Monta a estrutura do novo conteúdo
                        headerDiv.appendChild(img);
                        headerDiv.appendChild(spanTitle);
                        elemento.appendChild(headerDiv);
                        elemento.appendChild(spanDescription);
    
                        // Suaviza a transição de entrada
                        gsap.to(elemento, { 
                            opacity: 1, 
                            duration: 0.5 
                        });
    
                        // Se estamos no último card, chama a função de restauração após 2 segundos
                        if (i === cards.length - 1) {
                            setTimeout(() => {
                                restaurarConteudo(); // Chama a função de restauração
                            }, 5000);
                        }
                    }
                });
            }, i * 2000); // Delay de 2 segundos para cada card
        });
    }
    
    function restaurarConteudo() {
        cards.forEach((card, cardIndex) => {
            const elemento = document.getElementById(card.id);
            
            setTimeout(() => {
                // Suaviza a transição de saída
                gsap.to(elemento, { 
                    opacity: 1, 
                    duration: 0.2, 
                    onComplete: () => {
                        elemento.innerHTML = ""; // Limpa o conteúdo atual
                        elemento.classList.remove("background-black"); // Restaura a cor de fundo
    
                        // Cria e insere a imagem
                        const img = document.createElement("img");
                        img.src = card.imgSrc;
                        img.alt = card.title;
                        elemento.appendChild(img);
    
                        // Cria e insere o título
                        const spanTitle = document.createElement("span");
                        spanTitle.classList.add("text-title");
                        spanTitle.textContent = card.title;
                        elemento.appendChild(spanTitle);
    
                        // Suaviza a transição de entrada
                        gsap.to(elemento, { 
                            opacity: 1, 
                            duration: 0.5 
                        });
    
                        // Se estamos no último card, reinicia o ciclo
                        if (cardIndex === cards.length - 1) {
                            setTimeout(() => {
                                trocarConteudo(); // Reinicia a troca de conteúdo após todos os cards serem restaurados
                            }, 2000); // Espera 2 segundos após o último card ser restaurado
                        }
                    }
                });
            }); // Atraso de 2 segundos para cada card
        });
    }
    
    // Inicializa a troca de conteúdo
    setTimeout(() => {
        trocarConteudo(); // Chama a primeira troca de conteúdo
    }, 5000); // Espera 5 segundos antes de começar a troca