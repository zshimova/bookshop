// переменные
const apiKey = 'AIzaSyC4NQMdGh19j2ElPgpWDLaXsdb7k_C_rLQ';
const activeTheme = document.querySelector('.book-gallery__category-item').getAttribute('data-category');
const currentStep = 0;
const getCountBooks = 6;


// fetch запрос
const bookRequest = () => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q="${activeTheme}"&key=${apiKey}&printType=books&startIndex=${currentStep}&maxResults=${getCountBooks}&langRestrict=en`)
        .then(response => {
            return response.json();
        })
        .then((json) => {
            return json['items'];
        })
        .catch(() => {
            console.log(error)
        })
};
console.log(bookRequest());


// получение и отображение объектов
const getAndShow = async() => {
    let books = await bookRequest ();

    currentStep++

    books.forEach((book) => {
        let img = book.volumeInfo.imageLink?.thumbnail ?? './src/img/icons/logo.svg';
        let authors = book.volumeInfo?.authors ?? '';
        let title = book.volumeInfo.title;
        let description = book.volumeInfo.description;
        let averageRating = book.volumeInfo.averageRating;
        let ratingsCount = book.volumeInfo.ratingsCount;
        let saleability = book.saleInfo.saleability;
        let selfLink = book.selfLink;
        let cost = '';
        let costType = '';

        if (saleability === 'FOR_SALE') {
            cost = book.saleInfo.retailPrice?.amount;
            costType = book.saleInfo.retailPrice?.currencyCode;
        }

        // отрисовка книги
        const newBook = `<div class="book-gallery__book">
            <img class="book-gallery__book-img" src="" alt="">
            <div class="book-gallery__info">
                <h3 class="author">${authors}</h3>
                <h2 class="title">${title}</h2>
                <div class="">
                    <div class="rating">${averageRating}</div>
                    <div class="count">${ratingsCount}</div>
                    <span></span>
                </div>
                <p class="description">${description}</p>
                <span class="price">${cost}</span>
                <button></button>
            </div>
        </div>`;
           document.querySelector('.book-gallery__book').innerHTML += newBook;
    })
   
}


// переключение категории
document.querySelectorAll('book-gallery__category-item').forEach((item) => {
    item.addEventListener('click', () => {

        document.querySelectorAll('book-gallery__category-item').forEach((item) => {
            item.classList.remove('active');
        });
        item.classList.add('active');
    });
});

function movecategory(num) {
    parentCat.innerLinks += `<div class="link n${index} ${index === 0 ? 'active' : ''}" data-index="${index}">${images[index].title}</div>`;
    updateSelectElement(num);
};

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('book-gallery__category-item')) {
        // document.querySelector('.book-gallery__book').innerHTML += '';
        activeTheme = event.target.innerText;
        console.log(activeTheme);
        getAndShow();
    }
})

// function updateSelectElement(num) {
//     document.querySelector('.link.active').classList.remove('active');
//     document.querySelector(`.link.n${num}`).classList.add('active');
// }