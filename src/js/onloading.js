let onloading = () => {
    const apiKey = 'AIzaSyC4NQMdGh19j2ElPgpWDLaXsdb7k_C_rLQ';
    let activeTheme = document.querySelector('.book-gallery__category-item').getAttribute('data-category');
    let currentStep = 0;
    const getCountBooks = 6;

    const bookRequest = () => {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${activeTheme}&key=${apiKey}&printType=books&startIndex=${currentStep}&maxResults=${getCountBooks}&langRestrict=en`)
            .then(response => response.json())
            .then(json => json['items'])
            .catch(error => console.log(error));
    };

    const getAndShow = async () => {
        let books = await bookRequest();
        if (!books) return;

        currentStep += getCountBooks;

        books.forEach((book) => {
            let img = book.volumeInfo.imageLinks?.thumbnail ?? './src/img/icons/logo.svg';
            let authors = book.volumeInfo.authors?.join(', ') ?? 'Unknown Author';
            let title = book.volumeInfo.title;
            let description = book.volumeInfo.description ?? 'No description';
            let ratingsCount = book.volumeInfo.ratingsCount ? `${book.volumeInfo.ratingsCount} reviews` : '';
            let cost = book.saleInfo.saleability === 'FOR_SALE' ? `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}` : 'Without price';

            let newBook = `
                <div class="book-gallery__book" id="${book.id}">
                    <img src="${img}" alt="${book.title}" class="book-gallery__book-img">
                    <div class="book-gallery__info">
                        <div class="book-gallery__first-block">
                            <h3 class="author">${authors}</h3>
                            <h2 class="title">${title}</h2>
                            <div class="rating">
                                <div class="review-stars">
                                    <div class="count">${ratingsCount}</div>
                                    <div class="stars">
                                        ${'<img src="./src/img/icons/gray-star.svg" class="review-star">'.repeat(5)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="book-gallery__second-block">
                            <p class="description">${description}</p>
                            <span class="price">${cost}</span>
                            <button class="btn" id="${book.id}">BUY NOW</button>
                        </div>
                    </div>
                </div>`;

            document.querySelector('.book-gallery__books').innerHTML += newBook;

            let rating = Math.floor(book.volumeInfo.averageRating || 0);
            let stars = document.getElementById(book.id).querySelectorAll('.review-star');
            for (let i = 0; i < rating; i++) {
                stars[i].src = './src/img/icons/gold-star.svg';
            }
        });

        updateCartButtons();
    };

    const updateCartButtons = () => {
        const btns = Array.from(document.querySelectorAll(".btn"));
        const container = document.querySelector(".header__icons-bag");

        let updateCartCount = () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let cartItems = `<div class="items-number">${cart.length}</div>`;
            container.innerHTML = cart.length > 0 ? cartItems : '';
        };

        btns.forEach(btn => {
            let bookId = btn.id;
            let book = {
                id: bookId,
                title: btn.closest('.book-gallery__book').querySelector('.title').textContent,
                author: btn.closest('.book-gallery__book').querySelector('.author').textContent,
                price: btn.closest('.book-gallery__second-block').querySelector('.price').textContent
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            if (cart.some(item => item.id === bookId)) {
                btn.classList.add("added");
                btn.innerHTML = "IN THE CART";
            }

            btn.addEventListener("click", () => {
                if (!btn.classList.contains("added")) {
                    addToCart(book);
                    btn.innerHTML = "IN THE CART";
                    btn.classList.add("added");
                } else {
                    removeFromCart(bookId);
                    btn.innerHTML = "BUY NOW";
                    btn.classList.remove("added");
                }
                updateCartCount();
            });
        });

        updateCartCount();
    };

    const addToCart = (book) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (!cart.some(item => item.id === book.id)) {
            cart.push(book);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    const removeFromCart = (bookId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== bookId);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    getAndShow();

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('book-gallery__category-item')) {
            document.querySelector('.book-gallery__category-item.active')?.classList.remove('active');
            event.target.classList.add('active');
            document.querySelector('.book-gallery__books').innerHTML = '';
            activeTheme = event.target.innerText;
            currentStep = 0;
            getAndShow();
        }
        if (event.target.classList.contains('load-more')) {
            getAndShow();
        }
    });
};

export { onloading };
