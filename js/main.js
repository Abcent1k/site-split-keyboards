let lastScrollTop = 0;
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;
const firstSection = document.getElementById("first-section");
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function getScrollbarWidth() {
    // Create a block with scrolling
    let outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // make it have scroll bars
    document.body.appendChild(outer);

    // Create the inner block and add it to the outer block
    let inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculate the width of the scroll bar
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing blocks
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

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

document.getElementById('menu-icon').addEventListener('click', () => {
    const scrollbarWidth = getScrollbarWidth();
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollbarWidth + 'px';
        if (header.classList.contains('scrolled'))
            header.style.width = `calc(100% - ${scrollbarWidth}px)`;
    } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        header.style.width = '100%';
    }
});

overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    sidebar.classList.remove('active');

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    header.style.width = '100%';
});