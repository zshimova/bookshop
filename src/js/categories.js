// Смена категории и загрузка следующих 6-и книг
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('book-gallery__category-item')) {
        document.querySelector('.book-gallery__category-item.active')?.classList?.remove('active');
        event.target.classList.add('active');
        document.querySelector('.book-gallery__books').innerHTML='';
        activeTheme = event.target.innerText;
        console.log(activeTheme);
        getAndShow();
    }
    if (event.target.classList.contains('load-more')) {
        getAndShow();
    }
})