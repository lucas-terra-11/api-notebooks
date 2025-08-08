document.addEventListener('DOMContentLoaded', () => {
  let todosNotebooks = [];

  fetch('./data/notebooks.json')
    .then(response => response.json())
    .then(data => {
      todosNotebooks = data;
      popularFiltros(todosNotebooks);
      exibirNotebooks(todosNotebooks);
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));

  const seletorPerfil = document.getElementById('perfil');
  seletorPerfil.addEventListener('change', () => {
    const filtro = seletorPerfil.value;
    const filtrados = filtro === 'todos'
      ? todosNotebooks
      : todosNotebooks.filter(nb => Array.isArray(nb.perfil) ? nb.perfil.includes(filtro) : nb.perfil.toLowerCase().includes(filtro.toLowerCase()));
    exibirNotebooks(filtrados);
  });
});

function exibirNotebooks(notebooks) {
  const container = document.getElementById('notebooks-container');
  container.innerHTML = ''; 

  notebooks.forEach(nb => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${nb.imagem}" alt="${nb.nome}">
      <div class="card-content">
        <h2>${nb.nome}</h2>
        <p>${nb.descricao}</p>
        <p><strong>💿 Processador:</strong> ${nb.cpu || '-'}</p>
        <p><strong>💾 RAM:</strong> ${nb.ram || '-'}</p>
        <p><strong>📦 SSD:</strong> ${nb.ssd || '-'}</p>
        <p><strong>🖥️ Tela:</strong> ${nb.tela || '-'}</p>
        <p><strong>🎮 GPU:</strong> ${nb.gpu || '-'}</p>
        <p><strong>👨‍💻 Sistema operacinal:</strong> ${nb.sistema || '-'}</p>

        <p><strong>✔️ Pontos Positivos:</strong></p>
        <ul class="lista">${nb.positivos.map(p => `<li>${p}</li>`).join('')}</ul>

        <p><strong>⚠️ Pontos Negativos:</strong></p>
        <ul class="lista">${nb.negativos.map(n => `<li>${n}</li>`).join('')}</ul>

        <p class="perfil"><strong>💼 Perfil:</strong> ${Array.isArray(nb.perfil) ? nb.perfil.join(', ') : nb.perfil}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

function popularFiltros(notebooks) {
  const seletor = document.getElementById('perfil');
  const perfis = new Set();

  notebooks.forEach(nb => {
    if (Array.isArray(nb.perfil)) {
      nb.perfil.forEach(p => perfis.add(p));
    } else {
      nb.perfil.split(',').map(p => p.trim()).forEach(p => perfis.add(p));
    }
  });

  Array.from(perfis).sort().forEach(perfil => {
    const option = document.createElement('option');
    option.value = perfil;
    option.textContent = perfil;
    seletor.appendChild(option);
  });
}
