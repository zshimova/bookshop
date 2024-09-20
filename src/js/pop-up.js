let popUp = () => {
    const showCartPopup = () => {
        const popup = document.getElementById('popup-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-cart-message';
            emptyMessage.innerText = 'В корзине ничего нет';
            cartItemsContainer.appendChild(emptyMessage);
        } else {
            cart.forEach((book, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `<span>${book.title}</span>`;

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Удалить';
                deleteButton.addEventListener('click', () => removeFromCart(index, book.id)); // Привязываем событие удаления

                cartItem.appendChild(deleteButton);
                cartItemsContainer.appendChild(cartItem);
            });
        }

        popup.style.display = 'flex';
    };

    const removeFromCart = (bookIndex, bookId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(bookIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        showCartPopup();

        // После удаления из корзины обновляем состояние кнопок на карточках
        const btn = document.getElementById(bookId).querySelector('.btn');
        if (btn) {
            btn.innerHTML = 'BUY NOW';
            btn.classList.remove('added');
        }

        // Обновляем счетчик корзины
        updateCartCount();
    };

    const updateCartCount = () => {
        const container = document.querySelector('.header__icons-bag');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItems = `<div class="items-number">${cart.length}</div>`;
        container.innerHTML = cart.length > 0 ? cartItems : '';
    };

    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('popup-cart').style.display = 'none';
    });

    document.querySelector('.header__icons-bag').addEventListener('click', showCartPopup);
};

export { popUp };
