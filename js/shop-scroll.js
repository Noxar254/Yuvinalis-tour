document.addEventListener('DOMContentLoaded', function() {
    const shopWrapper = document.querySelector('.shop-wrapper');
    const scrollLeftBtn = document.querySelector('.shop-scroll-container .scroll-left');
    const scrollRightBtn = document.querySelector('.shop-scroll-container .scroll-right');

    if (scrollLeftBtn && scrollRightBtn && shopWrapper) {
        scrollLeftBtn.addEventListener('click', () => {
            shopWrapper.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            shopWrapper.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
});
