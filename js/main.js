let lastScrollTop = 0;
let header = document.querySelector('header');
let headerHeight = header.offsetHeight;
let firstSection = document.getElementById("first-section");

window.addEventListener('scroll', () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        header.removeAttribute('style')
        firstSection.style.paddingTop = '0';
    } else if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
        header.classList.add('scrolled');
        header.style.top = `-${headerHeight}px`;
        firstSection.style.paddingTop =`${headerHeight}px`;
    } else if (currentScroll < lastScrollTop && header.classList.contains('scrolled')) {
        header.style.top = '0';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
