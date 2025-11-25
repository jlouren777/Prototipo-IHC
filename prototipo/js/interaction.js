// CONTROLES DO CARROSSEL
document.querySelectorAll('.carrossel-container').forEach(container => {
  const carrossel = container.querySelector('.carrossel');
  const btnLeft = container.querySelector('.btn-left');
  const btnRight = container.querySelector('.btn-right');

  const scrollAmount = 220;

  btnLeft.addEventListener('click', () => {
    carrossel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    carrossel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});


// ===============================
// CAMPO DE BUSCA
// ===============================

const campoBusca = document.getElementById('campoBusca');
const filmes = document.querySelectorAll('.filme');

const secoesParaEsconder = [
  document.getElementById('destaque'),
  document.getElementById('populares'),
  document.getElementById('tituloPopulares'),
];

const todosH2 = document.querySelectorAll('h2');

const botoes1 = document.querySelectorAll('.btn.btn-right');
const botoes2 = document.querySelectorAll('.btn.btn-left');


// EVENTO DO CAMPO DE BUSCA
campoBusca.addEventListener('input', () => {
  const termo = campoBusca.value.toLowerCase().trim();
  const estaBuscando = termo !== '';

  // FILTRO DOS FILMES
  filmes.forEach(filme => {
    const nome = filme.querySelector('img').alt.toLowerCase();

    if (estaBuscando) {
      filme.style.display = nome.includes(termo) ? 'block' : 'none';
    } else {
      filme.style.display = ''; // volta ao CSS original
    }
  });

  // MOSTRAR / ESCONDER BOTÕES
  [...botoes1, ...botoes2].forEach(btn =>
    btn.style.display = estaBuscando ? 'none' : ''
  );

  // ESCONDER / MOSTRAR SEÇÕES
  secoesParaEsconder.forEach(secao => {
    if (secao) secao.style.display = estaBuscando ? 'none' : '';
  });

  // ESCONDER / MOSTRAR H2
  todosH2.forEach(h2 =>
    h2.style.display = estaBuscando ? 'none' : ''
  );
});
