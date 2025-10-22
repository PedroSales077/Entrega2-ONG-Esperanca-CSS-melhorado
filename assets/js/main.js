/* ===============================
  MAIN.JS 
  Responsável por:
  - CRUD de Projetos
  - Cadastro de Voluntários
  - Cadastro de Doações
  - Blog e Relatórios de Transparência
  - Máscaras e validações simples
=============================== */

/* ======= UTILIDADES ======= */

// Função para criar máscara simples (telefone)
function aplicarMascaraTelefone(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = v;
  });
}

// Função para armazenar dados no localStorage
function salvarSession(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Função para recuperar dados do localStorage
function recuperarSession(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

/* ======= PROJETOS ======= */

let projetos = recuperarSession('projetos');

// Renderiza projetos na página projetos.html
function renderizarProjetos() {
  const container = document.getElementById('lista-projetos');
  if (!container) return;

  container.innerHTML = '';

  if (projetos.length === 0) {
    container.innerHTML = '<p>Nenhum projeto cadastrado ainda.</p>';
    return;
  }

  projetos.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'card-projeto';
    card.innerHTML = `
      <img src="${proj.imagem}" alt="${proj.titulo}" loading="lazy">
      <h3>${proj.titulo}</h3>
      <p>${proj.descricao}</p>
      <p><strong>Meta:</strong> R$ ${proj.meta}</p>
      <button onclick="window.location.href='doacoes.html#${idx}'" class="btn-doar">Doar</button>
    `;
    container.appendChild(card);
  });
}

// Formulário de cadastro de projetos
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const meta = document.getElementById('meta').value;
    const imagem = document.getElementById('imagem').value;

    projetos.push({ titulo, descricao, meta, imagem });
    salvarSession('projetos', projetos);

    document.getElementById('msg-feedback').textContent = 'Projeto cadastrado com sucesso!';
    formCadastro.reset();
    renderizarProjetos();
  });
}

renderizarProjetos();

/* ======= VOLUNTÁRIOS ======= */

let voluntarios = recuperarSession('voluntarios');

function carregarProjetosSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = '<option value="">Selecione um projeto</option>';
  projetos.forEach((proj, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = proj.titulo;
    select.appendChild(option);
  });
}

carregarProjetosSelect('projetoSelecionado');
carregarProjetosSelect('projetoDoacao');

// Formulário de cadastro de voluntários
const formVoluntario = document.getElementById('form-voluntario');
if (formVoluntario) {
  aplicarMascaraTelefone(document.getElementById('telefoneVoluntario'));

  formVoluntario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeVoluntario').value;
    const email = document.getElementById('emailVoluntario').value;
    const telefone = document.getElementById('telefoneVoluntario').value;
    const projeto = document.getElementById('projetoSelecionado').value;

    voluntarios.push({ nome, email, telefone, projeto });
    salvarSession('voluntarios', voluntarios);

    document.getElementById('msg-voluntario').textContent = 'Cadastro realizado com sucesso!';
    formVoluntario.reset();
  });
}

/* ======= DOAÇÕES ======= */

let doacoes = recuperarSession('doacoes');

const formDoacao = document.getElementById('form-doacao');
if (formDoacao) {
  formDoacao.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeDoador').value;
    const email = document.getElementById('emailDoador').value;
    const valor = document.getElementById('valorDoacao').value;
    const projeto = document.getElementById('projetoDoacao').value;

    doacoes.push({ nome, email, valor, projeto });
    salvarSession('doacoes', doacoes);

    document.getElementById('msg-doacao').textContent = 'Doação registrada com sucesso!';
    formDoacao.reset();
  });
};

// Caso tenha hash na URL, selecionar projeto automaticamente
window.addEventListener('load', () => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const select = document.getElementById('projetoDoacao');
    if (select) select.value = hash;
  }
});

/* ======= BLOG ======= */

let posts = recuperarSession('blogPosts');

function renderizarPosts() {
  const container = document.getElementById('blogPosts');
  if (!container) return;

  container.innerHTML = '';

  posts.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'postagem';
    div.innerHTML = `
      <h3>${p.titulo}</h3>
      <p>${p.conteudo}</p>
    `;
    container.appendChild(div);
  });
}

const formBlog = document.getElementById('form-blog');
if (formBlog) {
  formBlog.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('tituloPost').value;
    const conteudo = document.getElementById('conteudoPost').value;

    posts.push({ titulo, conteudo });
    salvarSession('blogPosts', posts);
    formBlog.reset();
    renderizarPosts();
  });
}

renderizarPosts();
