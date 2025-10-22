const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-mobile');

// Event listener para clicar no botão de menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
});

// Event listener para clicar em qualquer parte da tela
document.addEventListener('click', (event) => {
    const target = event.target;
    const isMenuBtn = target.closest('.menu-btn');
    const isMenu = target.closest('.menu-mobile');

    // Se não clicar no botão de menu nem na caixa de navegação, esconde a caixa de navegação
    if (!isMenuBtn && !isMenu) {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
    }
});
