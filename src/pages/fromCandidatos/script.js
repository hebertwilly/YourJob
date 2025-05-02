const page = document.title;

if(page === 'YourJob | Candidatos'){
    const buttonEmpresa = document.getElementById('candidatos');

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

//CARROSEL
const carrosel = document.getElementById('carrosel');
let isScrolling = false;
let autoScrollInterval;
let cardWidth = 0;
let numCards = 0;

function cloneCarroselItems() {
  const cards = [...carrosel.querySelectorAll('.card-carrosel')];
  numCards = cards.length;
  if (numCards === 0) return;

  cardWidth = cards[0].offsetWidth + 20; // 20 é o gap/margin
  const cloneBefore = cards.map(card => card.cloneNode(true));
  const cloneAfter = cards.map(card => card.cloneNode(true));

  // Clona no início e fim
  cloneBefore.forEach(clone => carrosel.prepend(clone));
  cloneAfter.forEach(clone => carrosel.appendChild(clone));

  // Define o scroll inicial no primeiro item original
  carrosel.scrollLeft = numCards * cardWidth;
}

function scrollCarrosel(direction) {
  if (isScrolling) return;

  isScrolling = true;
  carrosel.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });

  setTimeout(() => {
    checkLoop();
    isScrolling = false;
  }, 500);
}

function checkLoop() {
  const maxScroll = (numCards * 2) * cardWidth;

  // Se foi muito para esquerda (antes do primeiro original)
  if (carrosel.scrollLeft <= (numCards - 1) * cardWidth) {
    carrosel.scrollLeft += numCards * cardWidth;
  }

  // Se foi muito para direita (após o último original)
  if (carrosel.scrollLeft >= maxScroll) {
    carrosel.scrollLeft -= numCards * cardWidth;
  }
}

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    scrollCarrosel(1);
  }, 4000);
}

function pauseAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Eventos e inicialização
carrosel.addEventListener('mouseenter', pauseAutoScroll);
carrosel.addEventListener('mouseleave', startAutoScroll);

window.addEventListener('load', () => {
  cloneCarroselItems();
  startAutoScroll();
});
