// переменные
const apiKey = 'AIzaSyC4NQMdGh19j2ElPgpWDLaXsdb7k_C_rLQ';
let activeTheme = document.querySelector('.book-gallery__category-item').getAttribute('data-category');
let currentStep = 0;
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
// console.log(bookRequest());


// получение и отображение объектов
const getAndShow = async() => {
    let books = await bookRequest();

    currentStep++

    books.forEach((book) => {
        let img = book.volumeInfo.imageLinks?.thumbnail??'./src/img/icons/logo.svg'; 
        let authors = book.volumeInfo?.authors??'';
        let title = book.volumeInfo.title;
        let description = book.volumeInfo.description;
        let averageRating = book.volumeInfo.averageRating;
        if (averageRating) {
            averageRating = book.volumeInfo.averageRating;
        } else {
            averageRating = '';
        };

        let ratingsCount = book.volumeInfo.ratingsCount;
        if (book.ratingsCount) {
            ratingsCount = book.ratingsCount + 'reviews';
        } else {
            ratingsCount = '';
        };

        let saleability = book.saleInfo.saleability;
        let cost = 'Not for sale';
        let costType = '';

        if (saleability === 'FOR_SALE') {
            cost = book.saleInfo.retailPrice?.amount;
            costType = book.saleInfo.retailPrice?.currencyCode;
        };

     
        // отрисовка книги
        const newBook = `<div class="book-gallery__book" id="${book.id}">
            <img src="${img}" alt="${book.title}" class="book-gallery__book-img">
            <div class="book-gallery__info">
                <div class="book-gallery__first-block">
                    <h3 class="author">${authors}</h3>
                    <h2 class="title">${title}</h2>
                    <div class="rating">
                        <div class="review-stars">${averageRating}
                            <div class="count">${ratingsCount}<span></span></div>
                            <div class="stars">
                                <img src="./src/img/icons/gray-star.svg" class="review-star">
                                <img src="./src/img/icons/gray-star.svg" class="review-star">
                                <img src="./src/img/icons/gray-star.svg" class="review-star">
                                <img src="./src/img/icons/gray-star.svg" class="review-star">
                                <img src="./src/img/icons/gray-star.svg" class="review-star">
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="book-gallery__second-block">
                    <p class="description">${description}</p>
                    <span class="price">${cost}${costType}</span>
                    <button class="btn" id="${book.id}"><a class="" href="#" onclick="return false;">BUY NOW</a></button>
                </div>
            </div>
        </div>`;
        document.querySelector('.book-gallery__books').innerHTML += newBook;


        // Отризовка averageRating звездочек
        const currentBook = document.getElementById(book.id);
        let stars = Array.from(currentBook.querySelectorAll('.review-star'));

        if (book.averageRrating && book.reviews) {

            if (!Number.isInteger(book.averageRating)) {
                book.averageRating = Math.floor(book.averageRating);
            }
            switch (book.averageRating) {
                case 1:
                    stars[0].src = './src/icons/gold-star.svg';
                    break;
                case 2:
                    stars[0].src = './src/icons/gold-star.svg';
                    stars[1].src = './src/icons/gold-star.svg';
                    break;
                case 3:
                    stars[0].src = './src/icons/gold-star.svg';
                    stars[1].src = './src/icons/gold-star.svg';
                    stars[2].src = './src/icons/gold-star.svg';
                    break;
                case 4:
                    stars[0].src = './src/icons/gold-star.svg';
                    stars[1].src = './src/icons/gold-star.svg';
                    stars[2].src = './src/icons/gold-star.svg';
                    stars[3].src = './src/icons/gold-star.svg';
                    break;
                case 5:
                    stars[0].src = './src/icons/gold-star.svg';
                    stars[1].src = './src/icons/gold-star.svg';
                    stars[2].src = './src/icons/gold-star.svg';
                    stars[3].src = './src/icons/gold-star.svg';
                    stars[4].src = './src/icons/gold-star.svg';
                    break;
                default:
                    console.log('default');
            }
        }
        stars = [];
        console.log(stars)
    })



    // добавление в корзину
    const btns = Array.from(document.querySelectorAll(".btn"));
    const container = document.querySelector(".header__icons-bag");

    btns.forEach(btn => {
    if (Object.prototype.hasOwnProperty.call(localStorage, btn.id)) {
        btn.classList.add("added");
        btn.innerHTML = "IN THE CART";
    }

    let bagItems = `<div class="items-number">${Object.keys(localStorage).length}</div>`;
    if (Object.keys(localStorage).length > 0) {
        container.innerHTML = bagItems;
    }

    btn.addEventListener("click", () => {
        const idName = btn.id;
        if (!btn.classList.contains("added")) {
        btn.innerHTML = "IN THE CART";
        btn.classList.add("added");
        localStorage.setItem(idName, btn.id);
        } else if (btn.classList.contains("added")) {
        btn.innerHTML = "BUY NOW";
        btn.classList.remove("added");
        localStorage.removeItem(idName, btn.id);
        }
        bagItems = `<div class="items-number">${Object.keys(localStorage).length}</div>`;
        container.innerHTML = bagItems;
        if (Object.keys(localStorage).length == 0) {
        container.innerHTML = " ";
        }
    });
});
};


// вызов функции
getAndShow();


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
